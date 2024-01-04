import { PageHeader } from "@/components/ui/PageHeader"
import { TaskForm, addTask } from "@/features/task-list"
import { ArrowLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"

export function NewTaskPage() {
  const navigate = useNavigate()

  return (
    <>
      <PageHeader>
        {" "}
        <div className="flex justify-start items-center gap-5">
          <ArrowLeft
            className="w-6 h-6 cursor-pointer text-slate-300 hover:text-slate-200"
            onClick={() => navigate(-1)}
          />
          New Task
        </div>
      </PageHeader>
      <TaskForm
        onSubmit={(newTask) => {
          addTask(newTask)
          navigate("/tasks")
        }}
      />
    </>
  )
}
