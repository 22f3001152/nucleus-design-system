# Mermaid code block converter for Jekyll
# Converts <code class="language-mermaid"> blocks to <div class="mermaid">

Jekyll::Hooks.register :posts, :post_render do |post|
  post.output.gsub!(/<pre><code class="language-mermaid">(.*?)<\/code><\/pre>/m) do
    content = $1
    # Decode HTML entities
    content = content.gsub('&lt;', '<').gsub('&gt;', '>').gsub('&amp;', '&')
    "<div class=\"mermaid\">#{content}</div>"
  end
end

Jekyll::Hooks.register :pages, :post_render do |page|
  page.output.gsub!(/<pre><code class="language-mermaid">(.*?)<\/code><\/pre>/m) do
    content = $1
    content = content.gsub('&lt;', '<').gsub('&gt;', '>').gsub('&amp;', '&')
    "<div class=\"mermaid\">#{content}</div>"
  end
end

Jekyll::Hooks.register :documents, :post_render do |document|
  document.output.gsub!(/<pre><code class="language-mermaid">(.*?)<\/code><\/pre>/m) do
    content = $1
    content = content.gsub('&lt;', '<').gsub('&gt;', '>').gsub('&amp;', '&')
    "<div class=\"mermaid\">#{content}</div>"
  end
end
