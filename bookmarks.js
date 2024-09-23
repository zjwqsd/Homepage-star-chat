document.addEventListener('DOMContentLoaded', function() {
    const bookmarksContainer = document.getElementById('bookmarks-container');
  
    // 获取收藏夹数据
    chrome.bookmarks.getTree(function(bookmarkTreeNodes) {
      processBookmarks(bookmarkTreeNodes);
    });
  
    function processBookmarks(nodes) {
      nodes.forEach(function(node) {
        if (node.children) {
          processBookmarks(node.children);
        } else {
          addBookmarkTile(node);
        }
      });
    }
  
    function addBookmarkTile(bookmark) {
      // 创建每个书签的平铺元素
      const tile = document.createElement('div');
      tile.className = 'bookmark-tile';
  
      // 创建图标元素（可选：使用书签的favicon，或默认图标）
      const icon = document.createElement('img');
      icon.src = `https://www.google.com/s2/favicons?domain=${new URL(bookmark.url).hostname}`;
      tile.appendChild(icon);
  
      // 创建书签链接元素
      const link = document.createElement('a');
      link.href = bookmark.url;
      link.target = '_blank';
      link.textContent = bookmark.title || 'Untitled';
      tile.appendChild(link);
  
      // 将平铺添加到容器中
      bookmarksContainer.appendChild(tile);
    }
  });
  