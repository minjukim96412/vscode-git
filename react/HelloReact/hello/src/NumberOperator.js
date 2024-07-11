export default function NumberOperator(props) {  
    return(
        <>
            첫번째 수:<input type='text' id='num1'></input> 
            두번째 수:<input type='text' id='num2'></input> 
            <input id='btn' type='button' value='합계' 
            onClick={props.onChangeMode} /><br />
            <span id='result' ></span>
        </>
    );
}