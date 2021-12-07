import * as React from 'react';

const FormAnswers = props => {

    const formEditStyle = {
        formBox: {
            background: 'rgba(0,0,0,0.01)', 
            border: 'solid 1px #0000001a', 
            boxShadow: '2px 2px 3px -1px rgba(0,0,0,0.5)', 
            margin: '5px', 
            display: 'flex', 
            alignItems: 'start', 
            justifyContent: 'space-between', 
            padding: '20px 10px 30px 10px'
        },
        formStyle: {
            width: '65%'
        },
        answerCard: {
            background: '#ffffff', 
            border: 'solid 1px #0000001a', 
            boxShadow: '2px 2px 3px -1px rgba(0,0,0,0.5)', 
            margin: '5px',  
            padding: '20px 10px 30px 10px' 
        },
        answerCardTitle: {
            textAlign: 'center',
            display: 'block'
        },
        answerCardBlock: {
            margin: '10px' 
        },
        answerCardBlockItem: {

        }
    }
   
    return (
        <>    
            <div className="questions-box" style={formEditStyle.formBox}>
                <div className={`lists-item`} style={{width: '100%', padding: '20px'}}>
                    <div className="lists-item-header" style={{}}>
                        <h2 style={{textAlign: 'center'}}>{`Ответы на опрос: ${props.answers[0].name}`}</h2>
                        <div style={{margin: '40px 0'}}>
                            <span></span>
                        </div>                               
                    </div>
                   { props.answers.map((answer) => {
                        return (
                            <>
                            <div style={formEditStyle.answerCard} className="answer-card">
                                <span style={formEditStyle.answerCardTitle}>Ответы пользователя с id: {answer.answerId}</span>
                                {Object.keys(answer.allAnswers).map(i => (
                                    <>
                                        <div style={formEditStyle.answerCardBlock} className="answer-card-block">
                                            <div style={formEditStyle.answerCardBlockItem} className="answer-card-block-item">
                                                <span>Ответ на вопрос №{i.split('-')[1]}</span>
                                            </div>
                                            <div style={formEditStyle.answerCardBlockItem} className="answer-card-block-item">
                                                <span>{answer.allAnswers[i]}</span>
                                            </div>
                                        </div>
                                    </>
                                ))}
                            </div>
                            </>
                            )
                        }) }    
                </div>
            </div>
        </>
    )
}

export default FormAnswers;