import { useRouter } from 'next/navigation';
import { useTasks } from "../context/TasksContext.js";

const TaskCard = () => {
    const { tasks, deleteTask } = useTasks();//Context
    const router = useRouter()
    // console.log(tasks)
    return (
        <div style={{ background: "#202020", color: "white" }}>
            {tasks.map((t) => (
                <div key={t.id}>                    
                    <div onClick={() => router.push(`/edit/${t.id}`)}>
                        <h1>{t.title}</h1>
                        <p>{t.description}</p>
                    </div>
                        <button onClick={(e) => deleteTask(t.id)}>Delete</button>
                </div>
            ))}
        </div>
    )
}

export default TaskCard