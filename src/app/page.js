"use client";
import TaskCard from "../components/TaskCard.jsx";
const Page = () => {
  // console.log(tasks)

  return (
    <div className="flex justify-center">
      <div className="w-7/12">
        <TaskCard />
      </div>
    </div>
  );
};

export default Page;
