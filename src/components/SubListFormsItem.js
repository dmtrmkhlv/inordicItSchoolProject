import * as React from 'react';
import {useState} from 'react';
import EditForm from './EditForm';
import { connect } from 'react-redux'
import {deleteForm} from '../store/forms/actions';
import { nanoid } from 'nanoid';

const SubListFormsItem = props=>{

    const [isEdit, updateIsEdit] = useState(false);

    const [showRepost, updateShowRepost] = useState(false);

    const [showCopyLink, updateShowCopyLink] = useState(false);

    const handleClickName = ()=>{
        updateIsEdit(!isEdit);    
    }

    const handleRepost = ()=>{
        updateShowRepost(!showRepost); 
    }

    const handleGetAnswers = (id)=>{
        props.getAnswers(id);
    }

    const copyLink = (e) => {
        e.target.select();
        document.execCommand("copy");
        updateShowCopyLink(!showCopyLink); 
        setTimeout(()=>{
            updateShowCopyLink(showCopyLink); 
        }, 1000);
    }

    const changeForm = (id, formData) =>{
        props.handleChangeForm(id, formData);
        updateIsEdit(!isEdit);
    }

    const slfiStyle = {
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
        repostBG: {
            display: 'none',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'fixed',
            background: 'rgba(0,0,0,0.5)',
            width: '100%',
            top: 0,
            bottom: 0,
            let: 0,
            right:0
        },
        repostBlock: {
            position: 'relative',
            minHeight: '25%',
            minWidth: '50%',
            background: '#ffffff', 
            border: 'solid 1px #0000001a', 
            boxShadow: '2px 2px 3px -1px rgba(0,0,0,0.5)', 
            display: 'flex',
            flexDirection: 'column',
            padding: '30px'
        },
        buttonClose: {
            position: 'absolute',
            right: '10px',
            top: '0'
        },
        input: {
            width: '100%',
            margin: '10px 0',
            cursor: 'pointer'
        },
        link: {
            display: 'block',
            position: 'absolute',
            background: '#ffffff', 
            border: 'solid 1px #0000001a', 
            boxShadow: '2px 2px 3px -1px rgba(0,0,0,0.5)', 
            padding: '10px',
            margin: '0 auto',
            top: '-50px',
            left: '0',
            right: '0',
            width: '170px'
        },
        blockButton:{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'end',
            marginTop: '18px',
            width: '30%',
        },
        button:{
            width: '120px'
        }
    }
    !showRepost ? slfiStyle.repostBG.display = "none" : slfiStyle.repostBG.display = "flex";
    !showCopyLink ? slfiStyle.link.display = "none" : slfiStyle.link.display = "block";

    return(
        <div
        key={nanoid()}
         className="lists-item-box-form" style={slfiStyle.formBox} >
            {
                !isEdit ? <div className="lists-item-box-form-name" style={{width: '65%', margin: '28px 5px 10px 5px'}}>??????????: {props.name}</div>
                    :   
                    <>
                        <EditForm 
                            changeForm={changeForm} 
                            formId={props.id}
                            formName={props.name} 
                            formDescription={props.description}
                            formQuestions={props.questions} 
                            handleChangeForm={props.handleChangeForm}
                            isEdit={props.isEdit} />
                    </>
            }
            <div className="lists-item-box-form-repost" style={slfiStyle.repostBG} onClick={handleRepost}>
                <div className="lists-item-box-form-repost-block" style={slfiStyle.repostBlock} onClick={e => e.stopPropagation()}>
                    <h3>???????????? ???? ??????????</h3>
                    <span>???????????????? ???? ???????? ????????, ?????????? ?????????????????????? ????????????</span>
                    <input style={slfiStyle.input} type="text" name="link" defaultValue={`http://localhost:8080/form/${props.id}`} placeholder="???????????? ???? ??????????" onClick={copyLink} />
                    <button className="button-close" style={slfiStyle.buttonClose} onClick={handleRepost}>X</button>
                    <div style={slfiStyle.link}><span>???????????? ??????????????????????!</span></div>
                </div>
            </div>
 
            <div style={slfiStyle.blockButton}>
                { !isEdit ?  <button onClick={handleClickName} style={slfiStyle.button}>??????????????????????????</button> :  <button onClick={handleClickName} style={slfiStyle.button}>??????????????</button>} 
                <button onClick={handleRepost} style={slfiStyle.button}>????????????????????</button>
                <button onClick={e => handleGetAnswers(props.id)} style={slfiStyle.button}>????????????</button>
                <button className="button-delete" style={slfiStyle.button} onClick={e => props.handleDeleteForm(props.id)}>??????????????</button>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    comments: state.comments
});

const mapDispatchToProps = {
    deleteForm
};

export default connect (mapStateToProps, mapDispatchToProps) (SubListFormsItem);