type ProgressBarType = {
  rate: string
  bgColor: string
  title: string
}

export const ProgressBar = ({ rate, bgColor, title }: ProgressBarType) => {
  return (
    <div className="m-4">
      <span className="block text-center text-xs uppercase dark:text-neutral-200">
        {title}
      </span>
      <div className="mx-auto my-4 w-[90%] rounded-lg bg-neutral-200 dark:bg-neutral-600">
        <div
          className={`${bgColor} rounded-lg p-0.5 text-center text-sm font-bold leading-none text-white`}
          style={{ width: rate + '%' }}
        >
          {rate}%
        </div>
      </div>
    </div>
  )
}
