//ArtikelWp.tsx

export default function ArtikelWp({ post }: { post: any }) {
  return (
    <article
      key={post.id}
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
    >
       
      {/* Featured Image */}
      <div className="relative h-48 overflow-hidden">
        {post._embedded && post._embedded["wp:featuredmedia"] ? (
          <img
            src={post._embedded["wp:featuredmedia"][0].source_url}
            alt={post.title.rendered}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
            <span className="text-white font-semibold">No Image</span>
          </div>
        )}
        <div className="absolute top-4 left-4">
          <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-medium">
            Post
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6">
        <h2
          className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 hover:text-blue-600 transition-colors duration-200"
          dangerouslySetInnerHTML={{ __html: post.title.rendered }}
        />

        <div
          className="text-gray-600 mb-4 line-clamp-3 text-sm"
          dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
        />

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <span className="text-xs text-gray-500">
            {new Date(post.date).toLocaleDateString("id-ID", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </span>
          <a
            href={post.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-600 transition-colors duration-200"
          >
            Baca Selengkapnya
            <svg
              className="w-4 h-4 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </a>
        </div>
      </div>
    </article>
  );
}
