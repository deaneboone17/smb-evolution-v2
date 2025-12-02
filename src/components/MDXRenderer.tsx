import ReactMarkdown, { Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MDXRendererProps {
  content: string;
  className?: string;
  components?: Components;
}

export const MDXRenderer = ({ content, className, components }: MDXRendererProps) => {
  return (
    <div className={className}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {content}
      </ReactMarkdown>
    </div>
  );
};
