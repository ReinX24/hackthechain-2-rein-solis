import { SectionWrapper } from "./SectionWrapper";
import { SCHEMES, WORKOUTS } from "../utils/swoldier";
import { useState } from "react";
import { Button } from "./Button";

const Header = (props) => {
  const {
    index,
    title,
    description,
    poison,
    setPoison,
    muscles,
    setMuscles,
    goal,
    setGoal,
  } = props;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-center gap-2">
        <p className="text-3xl sm:text-4xl md:text-5xl font-semibold text-slate-400">
          {index}
        </p>
        <h4 className="text-xl sm:text-2xl md:text-3xl">{title}</h4>
      </div>
      <p className="text-sm sm:text-base mx-auto">{description}</p>
    </div>
  );
};

export default function Generator(props) {
  const [showModal, setShowModal] = useState(false);

  const {
    poison,
    setPoison,
    muscles,
    setMuscles,
    goal,
    setGoal,
    updateWorkout,
  } = props;

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const updateMuscles = (muscleGroup) => {
    // Removing muscle group if we click on it again (individual)
    if (muscles.includes(muscleGroup)) {
      setMuscles(muscles.filter((val) => val !== muscleGroup));
      return;
    }

    // If there are more than 2 muscles (for individual), do not add more
    if (muscles.length > 2) {
      return;
    }

    // If the chosen poison is not individual, set into an array
    if (poison !== "individual") {
      setMuscles([muscleGroup]);
      setShowModal(false);
      return;
    }

    // Set the muscles array, runs for individual category
    setMuscles([...muscles, muscleGroup]);

    if (muscles.length === 2) {
      setShowModal(false);
    }
  };

  return (
    <SectionWrapper
      id={"generate"}
      header={"generate your workout"}
      title={["It's", "Huge", "o'clock"]}
    >
      <Header
        index={"01"}
        title={"Pick your poison"}
        description={"Select the workout you wish to endure."}
      />
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {Object.keys(WORKOUTS).map((type, typeIndex) => {
          return (
            <button
              onClick={() => {
                // Whenever a poison is picked, reset muscles and change poison type
                setMuscles([]);
                setPoison(type);
              }}
              className={
                "bg-slate-950 border border-blue-400 py-3 duration-200 px-4 hover:border-blue-600 rounded-lg " +
                (type === poison ? "border-blue-600" : "border-blue-400")
              }
              key={typeIndex}
            >
              <p className="capitalize">{type.replaceAll("_", " ")}</p>
            </button>
          );
        })}
      </div>

      <Header
        index={"02"}
        title={"Lock on targets"}
        description={"Select the muscles judged for annihilation."}
      />
      <div className="bg-slate-950 border border-solid border-blue-400 rounded-lg flex flex-col">
        <button
          onClick={toggleModal}
          className="relative p-3 flex items-center justify-center"
        >
          <p className="capitalize">
            {muscles.length === 0 ? "Select muscles groups" : muscles.join(" ")}
          </p>
          <i className="fa-solid absolute right-3 top-1/2 -translate-y-1/2 fa-caret-down"></i>
        </button>

        {showModal && (
          <div className="flex flex-col px-3 pb-3">
            {/* The individual array only contains values whereas the other
            categories have a key and another array for their values */}
            {(poison === "individual"
              ? WORKOUTS[poison]
              : Object.keys(WORKOUTS[poison])
            ).map((muscleGroup, muscleGroupIndex) => {
              return (
                <button
                  key={muscleGroupIndex}
                  className={
                    "hover:text-blue-400 duration-200 " +
                    (muscles.includes(muscleGroup) ? "text-blue-400" : " ")
                  }
                  onClick={() => {
                    updateMuscles(muscleGroup);
                  }}
                >
                  <p className="uppercase">
                    {muscleGroup.replaceAll("_", " ")}
                  </p>
                </button>
              );
            })}
          </div>
        )}
      </div>

      <Header
        index={"03"}
        title={"Become a Juggernaut"}
        description={"Select your ultimate objective."}
      />
      {/* If it goes past the small screen breakpoint, change to grid-cols-3 */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {Object.keys(SCHEMES).map((scheme, schemeIndex) => {
          return (
            <button
              onClick={() => {
                setGoal(scheme);
              }}
              className={
                "bg-slate-950 border border-blue-400 py-3 duration-200 hover:border-blue-600 rounded-lg px-4 " +
                (scheme === goal ? "border-blue-600" : "border-blue-400")
              }
              key={schemeIndex}
            >
              <p className="capitalize">{scheme.replaceAll("_", " ")}</p>
            </button>
          );
        })}
      </div>

      <Button func={updateWorkout} text={"Formulate"} />
    </SectionWrapper>
  );
}
