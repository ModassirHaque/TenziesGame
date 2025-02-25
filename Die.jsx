export default function Die(props){
  const styles={
    backgroundColor:props.isHeld?"#59E391":"white"
  }
    return(
        <die>
          <button 
          onClick={props.hold} 
          style={styles}>{props.value}
          </button>
        </die>
    )
}