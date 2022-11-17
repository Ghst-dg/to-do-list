import React from "react";
import {TfiClose} from 'react-icons/tfi';
import './Slab.css'

const Slab = ({completed,
                bgImg,
                sideLine,
                dataUnsaved,
                id,
                updateTitle,
                title,
                deleteCard,
                updateNotes,
                note,
                completionToggler,
                saved}) =>
{
    return(
        <div className={completed ? 'bg' : `bg ${bgImg}`}
            style = {completed ? {boxShadow : 'none'} : {boxShadow : '0 1px 2px rgb(9 30 66 / 25%), 0 0 1px rgb(9 30 66 / 31%)'}}>

            <div className= {completed ? 'greyedOut' : 'atlasBox'}
                style = {completed ? {border: 'none'} : {borderColor: `${sideLine}`}}>

                <div className='titleBox'
                    style = {completed ? {fontStyle: 'italic'} : {fontStyle: 'normal'}}>
                    <span
                    onFocus={() => {dataUnsaved(id);}}
                    onBlur={(e) => {updateTitle(id, e.currentTarget.textContent);}}
                    contentEditable= 'true'
                    role='textbox'
                    suppressContentEditableWarning={true}>{title}</span>
                    <button
                    onClick={() => deleteCard(id)}><TfiClose/></button>
                </div>

                <span className='contentBox'
                    style = {completed ? {fontStyle: 'italic'} : {fontStyle: 'normal'}}
                    onFocus={() => {dataUnsaved(id);}}
                    onBlur={(e) => {updateNotes(id, e.currentTarget.textContent)}}
                    contentEditable= 'true'
                    role='textbox'
                    suppressContentEditableWarning={true}>{note}</span>

                <div className='footerContent'>
                    <button
                        onClick={() => completionToggler(id)}>{completed ? 'Set as Not Completed' : 'Set as Completed'}</button>
                    <div>
                        <span className="impVis"
                            style={completed ? {display: 'inline-block'} : {display: 'none'}}>COMPLETED!</span>
                        <span className="savedStatus"
                            style={saved ? {backgroundColor: '#36B37E'} : {backgroundColor: '#FF5630'}}>
                            {saved ? 'SAVED' : 'UNSAVED'}</span>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Slab;