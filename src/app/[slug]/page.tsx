import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github.css';

interface Params {
    slug: string;
}

export default async function BlogPage({ params }: { params: Promise<Params> }) {
    const resolvedParams = await params;
    const { slug } = resolvedParams;

    const issue = await fetch(`https://api.github.com/repos/${process.env.USER_GITHUB}/${process.env.REPO_GITHUB}/issues/${slug}`)
        .then(res => res.json());
    
    if (!issue || issue.message) {
        return <div className="text-center text-red-500">Error: {issue.message || 'Issue no encontrado'}</div>;
    }
    
    return (
        <div className="max-w-screen-lg mx-auto px-4 sm:px-6 lg:px-8 py-8 text-wrap">
            <label className="block text-sm">by {issue.user.login}, {issue.created_at.split('T')[0]}</label>
            <div className="prose md:prose-lg lg:prose-xl mt-2">
              {issue.labels.map((label: any) => (
                <label 
                  key={label.id} 
                  className="inline-block text-white text-xs px-2 py-1 rounded mr-2 mb-2"
                  style={{ backgroundColor: `#${label.color}` }}
                >
                  {label.name}
                </label>
              ))}
              <h1 className="text-3xl md:text-4xl font-bold my-6">{issue.title}</h1>
                  
                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeHighlight]}
                    components={{
                        img: ({ node, ...props }) => (
                            <img 
                                {...props} 
                                className="max-w-full rounded-lg mx-auto my-6 block w-full sm:w-3/4 lg:w-1/2" 
                                style={{
                                    maxHeight: '300px',
                                    objectFit: 'contain'
                                }}
                                alt={props.alt || 'Imagen del blog'}
                            />
                        ),
                        h1: ({ node, ...props }) => <h1 className="text-2xl md:text-3xl font-bold mt-8 mb-4" {...props} />,
                        h2: ({ node, ...props }) => <h2 className="text-xl md:text-2xl font-bold mt-6 mb-3" {...props} />,
                        h3: ({ node, ...props }) => <h3 className="text-lg md:text-xl font-bold mt-4 mb-2" {...props} />,
                        p: ({ node, children, ...props }) => {
                            const childrenArray = React.Children.toArray(children);
                            const hasOnlyOneImage = childrenArray.length === 1 && 
                                React.isValidElement(childrenArray[0]) && 
                                childrenArray[0].type === 'img';
                            if (hasOnlyOneImage) {
                                return <>{children}</>;
                            }
                            return <p className="my-4 text-base md:text-lg font-medium" {...props}>{children}</p>;
                        },
                        a: ({ node, ...props }) => <a className="text-blue-600 hover:underline" {...props} />,
                        ul: ({ node, ...props }) => <ul className="list-disc pl-4 md:pl-6 my-4" {...props} />,
                        ol: ({ node, ...props }) => <ol className="list-decimal pl-4 md:pl-6 my-4" {...props} />,
                        blockquote: ({ node, ...props }) => (
                            <blockquote className="border-l-4 border-gray-300 pl-4 italic my-4" {...props} />
                        ),
                        code: ({ node, className, ...props }) => {
                            const match = /language-(\w+)/.exec(className || '');
                            const isInline = !className || !match;
                            
                            return isInline ? (
                                <code className="px-1 text-sm bg-gray-200 rounded" {...props} />
                            ) : (
                                <pre className="rounded-md border-gray-300 border-[1px] shadow-md p-4 overflow-auto">
                                    <code className={`${className} text-[15px]`} {...props} />
                                </pre>
                            );
                        }
                    }}
                >
                    {issue.body}
                </ReactMarkdown>
            </div>
        </div>
    );
}