
  // Initial default workout data organized by body parts
const defaultData = {
  Monday: {
    focus: "Chest & Triceps",
    exercises: [
      { name: "Barbell Bench Press", sets: "4 sets x 8-10 reps", completed: false },
      { name: "Incline Dumbbell Press", sets: "3 sets x 10-12 reps", completed: false },
      { name: "Tricep Rope Pushdowns", sets: "3 sets x 12-15 reps", completed: false }
    ]
  },
  Tuesday: {
    focus: "Back & Biceps",
    exercises: [
      { name: "Lat Pulldowns", sets: "4 sets x 10-12 reps", completed: false },
      { name: "Seated Cable Rows", sets: "3 sets x 10-12 reps", completed: false },
      { name: "Dumbbell Bicep Curls", sets: "3 sets x 12-15 reps", completed: false }
    ]
  },
  Wednesday: {
    focus: "Legs & Core",
    exercises: [
      { name: "Barbell Squats", sets: "4 sets x 6-8 reps", completed: false },
      { name: "Romanian Deadlifts", sets: "3 sets x 8-10 reps", completed: false },
      { name: "Plank Hold", sets: "3 sets x 60 sec", completed: false }
    ]
  },
  Thursday: {
    focus: "Shoulders & Abs",
    exercises: [
      { name: "Overhead Press", sets: "4 sets x 8-10 reps", completed: false },
      { name: "Lateral Raises", sets: "4 sets x 12-15 reps", completed: false },
      { name: "Hanging Leg Raises", sets: "3 sets x 10-12 reps", completed: false }
    ]
  },
  Friday: {
    focus: "Upper Body / Arms",
    exercises: [
      { name: "Pull-ups", sets: "3 sets x max reps", completed: false },
      { name: "Dips", sets: "3 sets x 10-12 reps", completed: false },
      { name: "Hammer Curls", sets: "3 sets x 12 reps", completed: false }
    ]
  },
  Saturday: {
    focus: "Active Recovery / Cardio",
    exercises: [
      { name: "Light Jog or Cycling", sets: "30 mins", completed: false },
      { name: "Full Body Stretching", sets: "15 mins", completed: false }
    ]
  },
  Sunday: {
    focus: "Rest Day",
    exercises: [
      { name: "Complete Rest", sets: "Relax & Recover", completed: true }
    ]
  }
};

// Load saved data from localStorage or fallback to defaultData
let workoutData = JSON.parse(localStorage.getItem("gymWorkoutData")) || defaultData;
let currentDay = "Monday";

// DOM Elements
const dayButtons = document.querySelectorAll(".day-btn");
const dayTitle = document.getElementById("day-title");
const muscleFocus = document.getElementById("muscle-focus");
const exerciseList = document.getElementById("exercise-list");
const addExerciseForm = document.getElementById("add-exercise-form");
const exerciseNameInput = document.getElementById("exercise-name");
const exerciseSetsRepsInput = document.getElementById("exercise-sets-reps");

// Initialize Application
function init() {
  renderExercises();
  
  // Day Selector Button Event Listeners
  dayButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      dayButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      currentDay = btn.getAttribute("data-day");
      renderExercises();
    });
  });

  // Add Exercise Form Submission
  addExerciseForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = exerciseNameInput.value.trim();
    const setsReps = exerciseSetsRepsInput.value.trim();
    
    if (name && setsReps) {
      workoutData[currentDay].exercises.push({
        name: name,
        sets: setsReps,
        completed: false
      });
      saveAndRender();
      addExerciseForm.reset();
    }
  });
}

// Render Exercises for the Selected Day
function renderExercises() {
  const dayData = workoutData[currentDay];
  dayTitle.textContent = currentDay;
  muscleFocus.textContent = `Focus: ${dayData.focus}`;
  
  exerciseList.innerHTML = "";
  
  if (dayData.exercises.length === 0) {
    exerciseList.innerHTML = `<p style="color: var(--text-muted); text-align: center; padding: 1rem;">No exercises added for this day yet.</p>`;
    return;
  }

  dayData.exercises.forEach((exercise, index) => {
    const li = document.createElement("li");
    li.className = "exercise-item";
    
    li.innerHTML = `
      <div style="display: flex; align-items: center; gap: 0.75rem;">
        <input type="checkbox" ${exercise.completed ? "checked" : ""} data-index="${index}" style="width: 1.2rem; height: 1.2rem; cursor: pointer;">
        <div class="exercise-info">
          <h4 style="${exercise.completed ? "text-decoration: line-through; opacity: 0.6;" : ""}">${exercise.name}</h4>
          <span style="${exercise.completed ? "opacity: 0.6;" : ""}">${exercise.sets}</span>
        </div>
      </div>
      <button class="delete-btn" data-index="${index}" style="background: transparent; border: none; color: #ef4444; cursor: pointer; font-size: 1rem;" title="Delete Exercise">🗑️</button>
    `;
    
    exerciseList.appendChild(li);
  });

  // Attach Checkbox Change Listeners
  document.querySelectorAll(".exercise-item input[type='checkbox']").forEach(checkbox => {
    checkbox.addEventListener("change", (e) => {
      const index = e.target.getAttribute("data-index");
      workoutData[currentDay].exercises[index].completed = e.target.checked;
      saveAndRender();
    });
  });

  // Attach Delete Button Listeners
  document.querySelectorAll(".delete-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const index = e.target.getAttribute("data-index");
      workoutData[currentDay].exercises.splice(index, 1);
      saveAndRender();
    });
  });
}

// Save to LocalStorage and Refresh View
function saveAndRender() {
  localStorage.setItem("gymWorkoutData", JSON.stringify(workoutData));
  renderExercises();
}

// Run app on load
init();
;