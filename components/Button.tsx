export default function ButtonComponent(props) {
    return (
        <button className={props.className + " font-semibold inline-block text-sm px-6 py-3 leading-none border rounded transition text-black border-black dark:border-white dark:hover:border-transparent dark:text-white border-opacity-30 hover:border-transparent hover:text-white hover:bg-primary mt-4 lg:mt-0"}>
            {props.children}
        </button>
    )
}