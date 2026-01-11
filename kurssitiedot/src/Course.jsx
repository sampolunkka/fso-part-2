import React from "react";

const Part = ({part}) => {
    return (
        <p>
            {part.name} {part.exercises}
        </p>
    );
}

const Content = ({parts}) => {
    return (
        <div>
            {parts.map(part => (
                <Part key={part.id} part={part}/>
            ))}
        </div>
    );
}

const Header = ({name}) => {
    return (
        <h1>{name}</h1>
    );
}

const Total = ({parts}) => {
    return (
        <p>
            total of exercises {getTotalExercises(parts)}
        </p>
    );
}

const Course = ({course}) => {
    return (
        <div>
            <Header course={course.name}/>
            <Content parts={course.parts}/>
            <Total parts={course.parts}/>
        </div>
    );
}

const getTotalExercises = (parts) => {
    return parts.reduce((sum, part) => sum + part.exercises, 0);
}

export default Course;