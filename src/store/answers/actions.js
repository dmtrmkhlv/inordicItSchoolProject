const newAnswers = answersArr =>{
    return{
        type: 'NEW_ANSWERS',
        answers: {...answersArr}
    }
}

export default newAnswers;