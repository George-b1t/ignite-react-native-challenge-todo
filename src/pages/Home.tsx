import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

import { Header } from "../components/Header";
import { Task, TasksList } from "../components/TasksList";
import { TodoInput } from "../components/TodoInput";

export function Home() {
  const [currentId, setCurrentId] = useState(1);
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    setTasks((old) => [
      ...old,
      {
        id: currentId,
        done: false,
        title: newTaskTitle,
      },
    ]);

    setCurrentId((old) => old + 1);
  }

  function handleToggleTaskDone(id: number) {
    const tempTask = tasks.find((task) => task.id === id);

    if (!tempTask) return;

    tempTask.done = !tempTask.done;

    setTasks((oldValue) => [
      ...oldValue.filter((task) => task.id !== id),
      tempTask,
    ]);
  }

  function handleRemoveTask(id: number) {
    setTasks((oldValue) => [...oldValue.filter((task) => task.id !== id)]);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBEBEB",
  },
});
