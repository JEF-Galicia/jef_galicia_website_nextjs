export default function BoxComponent(props) {
    return (
        <div className={props.className + " w-full md:rounded-lg backdrop-blur-lg bg-white dark:bg-black dark:bg-opacity-30 bg-opacity-10 transition border border-gray-800 dark:border-white border-opacity-10 dark:border-opacity-10 border-b-0 last:border-b py-6 lg:py-10 px-6 lg:px-16 block focus:outline-none focus:ring-4 "}>
            {props.children}
        </div>
    )
}