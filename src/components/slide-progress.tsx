export interface SlideProgressProps {
  current: number
  total: number
}

export const SlideProgress: React.FC<SlideProgressProps> = ({ current, total }) => {
  const percentage = (current / total) * 100

  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5">
      <div
        className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-in-out"
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  )
}
