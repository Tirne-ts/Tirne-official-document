import type { MDXComponents } from 'mdx/types'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    h1: (props) => <h1 className="text-3xl font-bold my-6" {...props} />,
    code: (props) => <code className="bg-gray-100 px-1 rounded" {...props} />,
  }
}
