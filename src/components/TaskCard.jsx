import { useRouter } from 'next/navigation';
import { useTasks } from "../context/TasksContext.js";

const TaskCard = () => {
    const { tasks, deleteTask } = useTasks();//Context
    const router = useRouter()
    // console.log(tasks)
    return (
        <div>
            {tasks.map((t) => (
                <div key={t.id}  className='bg-gray-700 hover:bg-slate-600 cursor-pointer px-20 py-5 m-2 flex justify-between'>                    
                    <div onClick={() => router.push(`/edit/${t.id}`)}>
                        <h1>{t.title}</h1>
                        <p className='text-gray-300'>{t.description}</p>
                        <span className='text-gray-400 text-xs'>{t.id}</span>
                    </div>
                        <button onClick={(e) => deleteTask(t.id)} className='bg-red-700 hover:bg-red-600 px-3 items-center w-24 h-11 rounded-lg text-center mt-2'>Delete</button>
                </div>
            ))}
        </div>
    )
}

export default TaskCard