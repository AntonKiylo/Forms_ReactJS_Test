import './SubmitSection.css'

const SubmitSection = ({setEthernetOutput, setWirelessOutput, clearErrors}) => {
  const clearInputs = () => {
    setEthernetOutput({})
    setWirelessOutput({})
    clearErrors()
    document.querySelector('form').reset()
  }

  return (
    <section className='submit-section'>
      <button className='save-btn' type='submit'>SAVE</button>
      <button className='cancel-btn' type='button' onClick={clearInputs} >CANCEL</button>
    </section>
  )
}

export default SubmitSection