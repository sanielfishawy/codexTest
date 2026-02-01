"use client";

import { useMemo, useState, type FormEvent } from "react";

type Habit = {
  id: string;
  name: string;
  completed: boolean;
};

const initialHabits: Habit[] = [
  { id: "morning-water", name: "Drink a glass of water", completed: true },
  { id: "stretching", name: "Stretch for 5 minutes", completed: false },
];

export default function Home() {
  const [habits, setHabits] = useState<Habit[]>(initialHabits);
  const [newHabit, setNewHabit] = useState("");

  const completedCount = useMemo(
    () => habits.filter((habit) => habit.completed).length,
    [habits],
  );
  const progress = habits.length === 0 ? 0 : completedCount / habits.length;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = newHabit.trim();
    if (!trimmed) {
      return;
    }

    setHabits((current) => [
      {
        id: crypto.randomUUID(),
        name: trimmed,
        completed: false,
      },
      ...current,
    ]);
    setNewHabit("");
  };

  const toggleHabit = (id: string) => {
    setHabits((current) =>
      current.map((habit) =>
        habit.id === id
          ? { ...habit, completed: !habit.completed }
          : habit,
      ),
    );
  };

  const removeHabit = (id: string) => {
    setHabits((current) => current.filter((habit) => habit.id !== id));
  };

  const resetHabits = () => {
    setHabits((current) =>
      current.map((habit) =>
        habit.completed ? { ...habit, completed: false } : habit,
      ),
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <main className="mx-auto flex w-full max-w-3xl flex-col gap-10 px-6 py-16">
        <header className="flex flex-col gap-6">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-slate-400">
              Habit Tracker
            </p>
            <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">
              Build consistency, one checkmark at a time.
            </h1>
            <p className="mt-3 max-w-2xl text-base text-slate-300">
              Add habits you care about, toggle when completed, and keep a quick
              pulse on your daily progress.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-sm text-slate-400">Today&apos;s progress</p>
                <p className="text-2xl font-semibold">
                  {completedCount}/{habits.length} habits completed
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-slate-800 px-4 py-2 text-sm font-medium text-slate-200">
                  {Math.round(progress * 100)}% complete
                </span>
                <button
                  type="button"
                  onClick={resetHabits}
                  className="rounded-full bg-emerald-400 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-emerald-300"
                >
                  Reset today
                </button>
              </div>
            </div>
            <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-slate-800">
              <div
                className="h-full rounded-full bg-emerald-400 transition-all"
                style={{ width: `${progress * 100}%` }}
                aria-hidden="true"
              />
            </div>
          </div>
        </header>

        <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:flex-row">
            <label className="flex-1">
              <span className="sr-only">Add a habit</span>
              <input
                value={newHabit}
                onChange={(event) => setNewHabit(event.target.value)}
                placeholder="Add a new habit (e.g. 20-minute walk)"
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-base text-slate-100 placeholder:text-slate-500 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/30"
              />
            </label>
            <button
              type="submit"
              className="rounded-xl bg-emerald-400 px-5 py-3 font-semibold text-slate-950 transition hover:bg-emerald-300"
            >
              Add habit
            </button>
          </form>
        </section>

        <section className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Your habits</h2>
            <p className="text-sm text-slate-400">
              {habits.length === 0 ? "No habits yet." : "Tap to toggle."}
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {habits.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-800 bg-slate-900/40 p-8 text-center text-slate-400">
                Start by adding your first habit above.
              </div>
            ) : (
              habits.map((habit) => (
                <div
                  key={habit.id}
                  className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-800 bg-slate-900/40 p-5"
                >
                  <button
                    type="button"
                    onClick={() => toggleHabit(habit.id)}
                    className="flex flex-1 items-center gap-3 text-left"
                  >
                    <span
                      className={`flex h-6 w-6 items-center justify-center rounded-full border ${
                        habit.completed
                          ? "border-emerald-400 bg-emerald-400 text-slate-950"
                          : "border-slate-600 text-transparent"
                      }`}
                      aria-hidden="true"
                    >
                      ✓
                    </span>
                    <span
                      className={`text-base ${
                        habit.completed ? "text-slate-400 line-through" : ""
                      }`}
                    >
                      {habit.name}
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => removeHabit(habit.id)}
                    className="rounded-full border border-slate-700 px-4 py-2 text-sm font-medium text-slate-300 transition hover:border-rose-400 hover:text-rose-300"
                  >
                    Remove
                  </button>
                </div>
              ))
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
