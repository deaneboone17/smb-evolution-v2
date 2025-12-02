import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
// Scoring now computed server-side for security
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import type { AssessmentConfig } from '@/hooks/useAssessmentConfig';

// TypeScript declaration for reCAPTCHA
declare global {
  interface Window {
    grecaptcha: {
      ready: (callback: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

const schema = z.object({
  contact: z.object({
    firstName: z.string().min(1, 'First name is required').max(100),
    lastName: z.string().max(100).optional(),
    email: z.string().email('Valid email is required').max(255),
    phone: z.string().max(50).optional(),
    company: z.string().max(200).optional(),
    website: z.string().optional() // Honeypot field
  }),
  answers: z.record(z.any()),
  consent: z.boolean().refine(v => v === true, 'You must consent to continue')
});

type FormData = z.infer<typeof schema>;

interface AssessmentWizardProps {
  config: AssessmentConfig;
  onComplete: (resultSlug: string, submissionId: string) => void;
}

export function AssessmentWizard({ config, onComplete }: AssessmentWizardProps) {
  const [step, setStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [utm, setUtm] = useState<Record<string, string | null>>({});

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      contact: { firstName: '', email: '' },
      answers: {},
      consent: false
    }
  });

  // Capture and validate UTM parameters
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const utmSchema = z.object({
      source: z.string().max(200).regex(/^[a-zA-Z0-9_-]*$/).optional().nullable(),
      medium: z.string().max(200).regex(/^[a-zA-Z0-9_-]*$/).optional().nullable(),
      campaign: z.string().max(200).regex(/^[a-zA-Z0-9_-]*$/).optional().nullable(),
      term: z.string().max(200).optional().nullable(),
      content: z.string().max(200).optional().nullable()
    });

    const rawUtm = {
      source: params.get('utm_source'),
      medium: params.get('utm_medium'),
      campaign: params.get('utm_campaign'),
      term: params.get('utm_term'),
      content: params.get('utm_content')
    };

    try {
      const validated = utmSchema.parse(rawUtm);
      setUtm(validated);
    } catch (err) {
      // Invalid UTM parameters, use empty object
      setUtm({});
    }
  }, []);

  // Auto-save to localStorage
  useEffect(() => {
    const key = `smb-evo-assessment-draft-${config.slug}`;
    const subscription = watch(value => {
      localStorage.setItem(key, JSON.stringify(value));
    });

    // Load saved draft
    const saved = localStorage.getItem(key);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        Object.entries(parsed.contact || {}).forEach(([k, val]) => {
          setValue(`contact.${k as keyof FormData['contact']}`, val as string);
        });
        setValue('answers', parsed.answers || {});
        setValue('consent', !!parsed.consent);
      } catch { }
    }

    return () => subscription.unsubscribe();
  }, [watch, setValue, config.slug]);

  const totalSteps = 1 + config.sections.length + 1; // intro + sections + contact
  const progress = ((step + 1) / totalSteps) * 100;

  const onSubmit = async (values: FormData) => {
    // SECURITY: Honeypot check - reject if filled (bots auto-fill all fields)
    if (values.contact.website) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Submission failed. Please try again."
      });
      setIsSubmitting(false);
      return;
    }

    try {
      setIsSubmitting(true);

      // SECURITY: reCAPTCHA v3 verification
      const recaptchaSiteKey = '6Ld44gAsAAAAALx-SSMiAmMZX3iCBMjrow4J7ECi';

      try {
        await new Promise<void>((resolve) => {
          if (window.grecaptcha && window.grecaptcha.ready) {
            resolve();
          } else {
            const checkInterval = setInterval(() => {
              if (window.grecaptcha && window.grecaptcha.ready) {
                clearInterval(checkInterval);
                resolve();
              }
            }, 100);
            setTimeout(() => {
              clearInterval(checkInterval);
              resolve();
            }, 5000);
          }
        });

        const token = await new Promise<string>((resolve, reject) => {
          window.grecaptcha.ready(() => {
            window.grecaptcha.execute(recaptchaSiteKey, { action: 'submit_assessment' })
              .then(resolve)
              .catch(reject);
          });
        });

        // Verify token with edge function
        const { data: verifyData, error: verifyError } = await supabase.functions.invoke('verify-recaptcha', {
          body: { token }
        });

        if (verifyError || !verifyData?.success) {
          console.error('reCAPTCHA verification failed:', verifyError || verifyData);
          toast({
            variant: "destructive",
            title: "Verification Failed",
            description: "Please try again. If the problem persists, contact support."
          });
          setIsSubmitting(false);
          return;
        }

        console.log('reCAPTCHA verification passed with score:', verifyData.score);
      } catch (recaptchaError) {
        console.error('reCAPTCHA error:', recaptchaError);
        toast({
          variant: "destructive",
          title: "Security Check Failed",
          description: "Unable to verify request. Please refresh and try again."
        });
        setIsSubmitting(false);
        return;
      }

      // SECURITY: Score computed server-side to prevent client manipulation
      const { data: rpcData, error: rpcError } = await supabase.rpc('submit_assessment', {
        p_assessment_id: config.id,
        p_answers: values.answers as any,
        p_email: values.contact.email,
        p_first_name: values.contact.firstName,
        p_last_name: values.contact.lastName,
        p_company: values.contact.company,
        p_phone: values.contact.phone,
        p_utm: utm as any,
        p_consent: values.consent
      });

      if (rpcError) throw rpcError;

      const submissionId = Array.isArray(rpcData) ? rpcData?.[0]?.submission_id : (rpcData as any)?.submission_id;
      const resultSlug = Array.isArray(rpcData) ? rpcData?.[0]?.result_slug : (rpcData as any)?.result_slug;

      // Clear draft
      localStorage.removeItem(`smb-evo-assessment-draft-${config.slug}`);

      onComplete(resultSlug || 'beginner', submissionId || '');
    } catch (error: any) {
      if (import.meta.env.DEV) {
        console.error('Dev only:', error);
      }
      toast({
        variant: "destructive",
        title: "Error",
        description: "An error occurred. Please try again."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNext = () => {
    if (step < totalSteps - 1) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  return (
    <>
      <Helmet>
        <script src="https://www.google.com/recaptcha/api.js?render=6Ld44gAsAAAAALx-SSMiAmMZX3iCBMjrow4J7ECi" async defer />
      </Helmet>
      <div className="py-12 px-4 relative overflow-hidden">
        <div className="container mx-auto max-w-3xl relative z-10">
          <Progress value={progress} className="mb-8 h-2 bg-white/10 [&>div]:bg-gradient-to-r [&>div]:from-[#1C77C3] [&>div]:to-[#39B8FF]" />

          {/* Intro Step */}
          {step === 0 && (
            <Card className="bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl rounded-2xl">
              <CardHeader>
                <CardTitle className="text-3xl md:text-4xl font-montserrat font-bold text-white">
                  {config.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-lg text-gray-300">{config.description}</p>
                <Button onClick={handleNext} size="lg" className="w-full md:w-auto rounded-full bg-gradient-to-r from-[#1C77C3] to-[#06D6A0] text-white font-bold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 border-none">
                  Start Assessment
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Section Steps */}
          {step > 0 && step <= config.sections.length && (() => {
            const section = config.sections[step - 1];
            return (
              <Card className="bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-2xl font-montserrat font-bold text-white">{section.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-8">
                  {section.questions.map((question) => (
                    <div key={question.id} className="space-y-4">
                      <Label className="text-2xl font-semibold text-white block mb-4">{question.prompt}</Label>

                      {question.type === 'single' && (
                        <RadioGroup
                          onValueChange={(value) => setValue(`answers.${question.key}`, value)}
                          defaultValue={watch(`answers.${question.key}`) as string}
                          className="grid grid-cols-1 gap-4"
                        >
                          {question.options.map((option) => (
                            <div key={option.id}>
                              <RadioGroupItem value={option.value} id={`${question.id}-${option.value}`} className="sr-only" />
                              <Label
                                htmlFor={`${question.id}-${option.value}`}
                                className={`flex items-center p-4 rounded-xl cursor-pointer transition-all duration-200 border ${watch(`answers.${question.key}`) === option.value
                                  ? 'bg-[#1C77C3]/20 border-[#1C77C3] ring-1 ring-[#1C77C3]'
                                  : 'bg-white/5 border-white/10 hover:bg-white/10'
                                  }`}
                              >
                                <span className="text-lg text-gray-200">{option.label}</span>
                              </Label>
                            </div>
                          ))}
                        </RadioGroup>
                      )}

                      {question.type === 'multi' && (
                        <div className="grid grid-cols-1 gap-4">
                          {question.options.map((option) => {
                            const current = (watch(`answers.${question.key}`) as string[]) || [];
                            const isChecked = current.includes(option.value);
                            return (
                              <div key={option.id}>
                                <Checkbox
                                  id={`${question.id}-${option.value}`}
                                  className="sr-only"
                                  onCheckedChange={(checked) => {
                                    const updated = checked
                                      ? [...current, option.value]
                                      : current.filter(v => v !== option.value);
                                    setValue(`answers.${question.key}`, updated);
                                  }}
                                />
                                <Label
                                  htmlFor={`${question.id}-${option.value}`}
                                  className={`flex items-center p-4 rounded-xl cursor-pointer transition-all duration-200 border ${isChecked
                                    ? 'bg-[#1C77C3]/20 border-[#1C77C3] ring-1 ring-[#1C77C3]'
                                    : 'bg-white/5 border-white/10 hover:bg-white/10'
                                    }`}
                                >
                                  <span className="text-lg text-gray-200">{option.label}</span>
                                </Label>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  ))}

                  <div className="flex gap-3 pt-6">
                    <Button variant="outline" onClick={handleBack} className="rounded-full border-white/20 text-white hover:bg-white/10 hover:text-white bg-transparent">
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back
                    </Button>
                    <Button onClick={handleNext} className="rounded-full bg-gradient-to-r from-[#1C77C3] to-[#06D6A0] text-white font-bold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 border-none ml-auto">
                      Next
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })()}

          {/* Contact Step */}
          {step === totalSteps - 1 && (
            <form onSubmit={handleSubmit(onSubmit)}>
              <Card className="bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-2xl font-montserrat font-bold text-white">Almost Done!</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-gray-200">First Name *</Label>
                    <Input id="firstName" {...register('contact.firstName')} className="bg-white/5 border-white/10 text-white placeholder:text-gray-500" />
                    {errors.contact?.firstName && (
                      <p className="text-sm text-destructive">{errors.contact.firstName.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-gray-200">Last Name</Label>
                    <Input id="lastName" {...register('contact.lastName')} className="bg-white/5 border-white/10 text-white placeholder:text-gray-500" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-200">Email *</Label>
                    <Input id="email" type="email" {...register('contact.email')} className="bg-white/5 border-white/10 text-white placeholder:text-gray-500" />
                    {errors.contact?.email && (
                      <p className="text-sm text-destructive">{errors.contact.email.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-gray-200">Phone</Label>
                    <Input id="phone" type="tel" {...register('contact.phone')} className="bg-white/5 border-white/10 text-white placeholder:text-gray-500" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company" className="text-gray-200">Company</Label>
                    <Input id="company" {...register('contact.company')} className="bg-white/5 border-white/10 text-white placeholder:text-gray-500" />
                  </div>

                  {/* Honeypot field - hidden from users, filled by bots */}
                  <div className="absolute left-[-9999px] opacity-0 pointer-events-none" aria-hidden="true">
                    <Label htmlFor="website">Website</Label>
                    <Input id="website" {...register('contact.website')} tabIndex={-1} autoComplete="off" />
                  </div>

                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="consent"
                      onCheckedChange={(checked) => setValue('consent', !!checked)}
                      className="border-white/20 data-[state=checked]:bg-[#1C77C3] data-[state=checked]:border-[#1C77C3]"
                    />
                    <Label htmlFor="consent" className="font-normal leading-tight cursor-pointer text-gray-300">
                      I agree to receive communications about SMB Evolution's content and services.
                    </Label>
                  </div>
                  {errors.consent && (
                    <p className="text-sm text-destructive">{errors.consent.message}</p>
                  )}

                  <div className="flex gap-3 pt-4">
                    <Button type="button" variant="outline" onClick={handleBack} disabled={isSubmitting} className="rounded-full border-white/20 text-white hover:bg-white/10 hover:text-white bg-transparent">
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back
                    </Button>
                    <Button type="submit" disabled={isSubmitting} className="rounded-full bg-gradient-to-r from-[#1C77C3] to-[#06D6A0] text-white font-bold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 border-none ml-auto">
                      {isSubmitting ? 'Submitting...' : 'See My Results'}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
