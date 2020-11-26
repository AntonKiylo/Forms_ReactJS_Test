import { useEffect } from 'react'
import './EthernetSection.css'

const EthernetSection = ({ethernetIPError, ethernetDNSError, ethernetSubnetMaskError, isWiFiEnabled, ethernetOutput, setEthernetOutput, selectedEthernetIPRadio, setSelectedEthernetIPRadio, selectedEthernetDNSRadio, setSelectedEthernetDNSRadio}) => {

  const changeEthernetIPRadio = e => {
    setSelectedEthernetIPRadio(e.target.value)
  }
  
  const changeEthernetDNSRadio = e => {
    setSelectedEthernetDNSRadio(e.target.value)
  }

  const changeEthernalInput = e => {
    setEthernetOutput({...ethernetOutput, [e.target.name]: e.target.value})
  }

  useEffect(() => {
    setSelectedEthernetDNSRadio('ethernet-automatically-DNS')
    setSelectedEthernetIPRadio('ethernet-automatically-IP')
  }, [isWiFiEnabled, setSelectedEthernetIPRadio, setSelectedEthernetDNSRadio])

  return (
    <section className='ethernet-section'>
      <h3>Ethernet Settings</h3>

      <p>
        <input
          type='radio'
          value='ethernet-automatically-IP'
          name='ethernet-automatically-IP'
          onChange={changeEthernetIPRadio}
          checked={selectedEthernetIPRadio === 'ethernet-automatically-IP'}
          disabled={isWiFiEnabled}
        />
        <label htmlFor='ethernet-automatically-IP'> Obtain an IP address automatically (DHCP/BootP)</label>
      </p>
      <p>
        <input
          type='radio'
          value='ethernet-following-IP'
          name='ethernet-following-IP'
          onChange={changeEthernetIPRadio}
          checked={selectedEthernetIPRadio === 'ethernet-following-IP'}
          disabled={isWiFiEnabled}
        />
        <label htmlFor='ethernet-following-IP'> Use the following IP address:</label>
      </p>

      <div className={`${selectedEthernetIPRadio === 'ethernet-automatically-IP' ? 'IP-inputs' : ''}`}>
        <div>
          <label htmlFor='ethernet-IP-address'>IP address: <i className='attention'>*</i> </label>
          <input
            type='text'
            name='ethernet-IP-address'
            disabled={selectedEthernetIPRadio !== 'ethernet-following-IP'}
            required
            onChange={changeEthernalInput}
            value={ethernetOutput.name}
          />
          <div style={{color: "red" }}>
            {ethernetIPError}
          </div>
        </div>
        <div>
          <label htmlFor='ethernet-subnet-mask'>Subnet Mask: <i className='attention'>*</i> </label>
          <input
            type='text'
            name='ethernet-subnet-mask'
            disabled={selectedEthernetIPRadio !== 'ethernet-following-IP'}
            required
            onChange={changeEthernalInput}
            value={ethernetOutput.name}
          />
          <div style={{color: "red"}}>
            {ethernetSubnetMaskError}
          </div>
        </div>
        <div>
          <label htmlFor='ethernet-default-gateway'>Default Gateway: </label>
          <input
            type='text'
            name='ethernet-default-gateway'
            disabled={selectedEthernetIPRadio !== 'ethernet-following-IP'}
            onChange={changeEthernalInput}
            value={ethernetOutput.name}
          />
        </div>
      </div>

      <p>
        <input
          type='radio'
          value='ethernet-automatically-DNS'
          name='ethernet-automatically-DNS'
          onChange={changeEthernetDNSRadio}
          checked={selectedEthernetDNSRadio === 'ethernet-automatically-DNS'}
          disabled={isWiFiEnabled}
        />
        <label htmlFor='ethernet-automatically-DNS'> Obtain DNS server address automatically</label>
      </p>
      <p>
        <input
          type='radio'
          value='ethernet-following-DNS'
          name='ethernet-following-DNS'
          onChange={changeEthernetDNSRadio}
          checked={selectedEthernetDNSRadio === 'ethernet-following-DNS'}
          disabled={isWiFiEnabled}
        />
        <label htmlFor='ethernet-following-DNS'> Use the following DS address:</label>
      </p>

      <div className={`${selectedEthernetDNSRadio === 'ethernet-automatically-DNS' ? 'IP-inputs' : ''}`}>
        <div>
        <label htmlFor='ethernet-preferred-DNS'>Preferred DNS server: <i className='attention'>*</i> </label>
          <input
            type='text'
            name='ethernet-preferred-DNS'
            disabled={selectedEthernetDNSRadio !== 'ethernet-following-DNS'}
            required
            onChange={changeEthernalInput} value={ethernetOutput.name}
          />
          <div style={{color: 'red'}}>
            {ethernetDNSError}
          </div>
        </div>
        <div>
          <label htmlFor='ethernet-alternative-DNS'>Alternative DNS server: </label>
          <input
            type='text'
            name='ethernet-alternative-DNS'
            disabled={selectedEthernetDNSRadio !== 'ethernet-following-DNS'}
            onChange={changeEthernalInput}
            value={ethernetOutput.name}
          />
        </div>
      </div>

    </section>
  )
}

export default EthernetSection