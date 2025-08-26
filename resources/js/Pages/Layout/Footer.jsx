export default function Footer() {
  return (
    <footer className="d-footer">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <p className="mb-0 text-neutral-600">
          &copy; 2025 mdwiastika. All Rights Reserved.
        </p>
        <p className="mb-0 text-neutral-600 dark:text-white">
          Made by
          <a
            href="https://github.com/mdwiastika"
            className="text-primary-600 dark:text-primary-600 hover:underline"
          >
            &nbsp;mdwiastika
          </a>
        </p>
      </div>
    </footer>
  )
}
