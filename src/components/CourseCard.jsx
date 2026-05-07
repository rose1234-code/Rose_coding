

export default function CourseCard({
  title,
  level,
  duration,
  description,
}) {
  return (
    <div className="bg-surface-container-lowest rounded-xl p-8 flex flex-col justify-between hover:shadow-lg transition border border-outline-variant/30">

      <div>
        <div className="flex justify-between mb-6">
          <span className="text-xs font-bold">{level}</span>
          <span className="text-sm">{duration}</span>
        </div>

        <h3 className="text-xl font-bold text-primary mb-3">
          {title}
        </h3>

        <p className="text-sm text-on-surface-variant">
          {description}
        </p>
      </div>

      <button className="mt-6 bg-primary text-white px-4 py-2 rounded-md">
        Explorer
      </button>
    </div>
  );
}