'use client'
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useTasks } from "../../context/TasksContext.js";
const AddTask = ({ params }) => {
  // const [task, setTask] = useState({
  //   title: '',
  //   description: '',
  // })
  const { tasks, createTask, updateTask } = useTasks()
  const router = useRouter()
  const { register, handleSubmit, setValue, formState: { errors } } = useForm()

  // console.log(params.id)

  // const handleChange = (e) => {
  //   setTask({
  //     ...task,
  //     [e.target.name]: e.target.value
  //   })
  //   // console.log(task)
  // }
  const onSubmit = handleSubmit((data) => {
    // e.preventDefault();

    if (params.id) {
      updateTask(params.id, data)
      toast.success('Task updated successfully')
    } else {
      createTask(data.title, data.description)
      toast.success('Task created successfully')
    }

    router.push('/');
  })

  useEffect(() => {
    if (params.id) {
      const taskFound = tasks.find((t) => t.id === params.id)
      console.log('Task found', taskFound)
      if (taskFound) {
        // setTask({title: taskFound.title, description: taskFound.description})
        setValue('title', taskFound.title)
        setValue('description', taskFound.description)
      }
    }
  }, [params.id, setValue, tasks])

  return (
    <div className='flex justify-center items-center h-full'>
      <form onSubmit={onSubmit} className='bg-gray-700 p-10'>
        <h2>New Task</h2>
        <input placeholder="Write a title" {...register('title', { required: true })} className='bg-gray-800 py-3 px-4 mb-2 block focus:outline-none w-full'/>
        {errors.title && <span className='block text-red-400 mb-2'>This field is required</span>}
        <textarea placeholder="Write a description" {...register('description', { required: true })} className='bg-gray-800 py-3 px-4 mb-2 block focus:outline-none w-full'></textarea>
        {errors.description && <span className='block text-red-400 mb-2'>This field is required</span>}
        <button className='bg-green-500 hover:bg-green-400 px-4 py-2 rounded disabled:opacity-30 ml-24'>Save</button>
      </form>
    </div>
  )
}

export default AddTask