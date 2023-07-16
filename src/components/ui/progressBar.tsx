type ProgressBarType = {
  rate: string
  color: string
  title: string
}

export const ProgressBar = ({ rate, color, title }: ProgressBarType) => {
  return (
    <div className="m-4">
      <span className="block text-center text-xs uppercase dark:text-neutral-200">
        {title}
      </span>
      <div className="mx-auto my-4 w-[90%] bg-neutral-200 dark:bg-neutral-600">
        <div
          className={`bg-${color} p-0.5 text-center text-sm font-bold leading-none text-white`}
          style={{ width: rate + '%' }}
        >
          {rate}%
        </div>
      </div>
    </div>
  )
}
