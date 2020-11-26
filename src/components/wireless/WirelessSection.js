import { useEffect, useState } from 'react';
import './WirelessSection.css'

const WirelessSection = ({setEthernetOutput, wirelessOutput, setWirelessOutput, wirelessIPError, wirelessDNSError, wirelessSubnetMaskError, clearErrors, isWiFiEnabled, setIsWiFiEnabled, selectedWirelessIPRadio, setSelectedWirelessIPRadio, selectedWirelessDNSRadio, setSelectedWirelessDNSRadio}) => {
  const [isSecurityEnable, setIsSecurityEnable] = useState(false)

  const toggleWiFi = () => {
    setIsWiFiEnabled(!isWiFiEnabled)
    setEthernetOutput({})
    setWirelessOutput({})
    clearErrors()
    document.querySelector('form').reset()
  }

  const toggleWirelessSecurity = () => {
    setIsSecurityEnable(!isSecurityEnable)
  }

  const changeWirelessIPRadio = e => {
    setSelectedWirelessIPRadio(e.target.value)
  }
  
  const changeWirelessDNSRadio = e => {
    setSelectedWirelessDNSRadio(e.target.value)
  }

  const changeWirelessInput = e => {
    setWirelessOutput({...wirelessOutput, [e.target.name]: e.target.value})
  }

  useEffect(() => {
    setSelectedWirelessDNSRadio('wireless-automatically-DNS')
    setSelectedWirelessIPRadio('wireless-automatically-IP')
    setIsSecurityEnable(false)
  }, [isWiFiEnabled, setSelectedWirelessIPRadio, setSelectedWirelessDNSRadio])

  return (
    <div className='wireless-section'>
      <h3>Wireless Settings</h3>

      <p>
        <input
          type='checkbox'
          name='enable-wifi'
          checked={isWiFiEnabled}
          onChange={toggleWiFi}
        />
        <label htmlFor='enable-wifi'> Enable wifi:</label>
      </p>
      <div>
        <label htmlFor='network-name' className={`${!isWiFiEnabled ? 'IP-inputs' : ''}`} >Wireless Network Name: <i className='attention'>*</i> </label>
        <select disabled={!isWiFiEnabled} name='network-name' required onChange={changeWirelessInput}>
          <option value=''>Please select</option>
          <option value='MTS'>MTS</option>
          <option value='A1'>A1</option>
        </select>
      </div>

      <p>
        <input
          type='checkbox'
          name='wireless-security'
          disabled={!isWiFiEnabled}
          checked={isSecurityEnable}
          onChange={toggleWirelessSecurity}
        />
        <label htmlFor='wireless-security'> Enable Wireless Security:</label>
      </p>
      <div>
        <label htmlFor='security-key' className={`${!isSecurityEnable ? 'IP-inputs' : ''}`} >Security Key: <i className='attention'>*</i> </label>
        <input
          name='security-key'
          type='text'
          disabled={!isSecurityEnable}
          value={wirelessOutput.name}
          onChange={changeWirelessInput}
          required
        />
      </div>

      <p>
        <input
          type='radio'
          value='wireless-automatically-IP'
          name='wireless-automatically-IP'
          onChange={changeWirelessIPRadio}
          checked={selectedWirelessIPRadio === 'wireless-automatically-IP'}
          disabled={!isWiFiEnabled}
        />
        <label htmlFor='wireless-automatically-IP'> Obtain an IP address automatically (DHCP/BootP)</label>
      </p>
      <p>
        <input
          type='radio'
          value='wireless-following-IP'
          name='wireless-following-IP'
          onChange={changeWirelessIPRadio}
          checked={selectedWirelessIPRadio === 'wireless-following-IP'}
          disabled={!isWiFiEnabled}
        />
        <label htmlFor=''> Use the following IP address:</label>
      </p>

      <div className={`${selectedWirelessIPRadio === 'wireless-automatically-IP' ? 'IP-inputs' : ''}`}>
        <div>
          <label htmlFor='wireless-IP-address'>IP address: <i className='attention'>*</i> </label>
          <input 
            type='text'
            name='wireless-IP-address'
            disabled={selectedWirelessIPRadio !== 'wireless-following-IP'}
            required
            onChange={changeWirelessInput}
            value={wirelessOutput.name}
          />
          <div style={{color: "red" }}>
            {wirelessIPError}
          </div>
        </div>
        <div>
          <label name='wireless-subnet-mask'>Subnet Mask: <i className='attention'>*</i> </label>
          <input
            type='text'
            name='wireless-subnet-mask'
            disabled={selectedWirelessIPRadio !== 'wireless-following-IP'}
            required
            onChange={changeWirelessInput}
            value={wirelessOutput.name}
          />
          <div style={{color: "red" }}>
            {wirelessSubnetMaskError}
          </div>
        </div>
        <div>
          <label htmlFor='wireless-default-gateway'>Default Gateway: </label>
          <input
            type='text'
            name='wireless-default-gateway'
            disabled={selectedWirelessIPRadio !== 'wireless-following-IP'}
            onChange={changeWirelessInput}
            value={wirelessOutput.name}
          />
        </div>
      </div>

      <p>
        <input
          type='radio'
          value='wireless-automatically-DNS'
          name='wireless-automatically-DNS'
          onChange={changeWirelessDNSRadio}
          checked={selectedWirelessDNSRadio === 'wireless-automatically-DNS'}
          disabled={!isWiFiEnabled}
        />
        <label htmlFor='wireless-automatically-DNS'> Obtain DNS server address automatically</label>
      </p>
      <p>
        <input
          type='radio'
          value='wireless-following-DNS'
          name='wireless-following-DNS'
          onChange={changeWirelessDNSRadio}
          checked={selectedWirelessDNSRadio === 'wireless-following-DNS'}
          disabled={!isWiFiEnabled}
        />
        <label htmlFor='wireless-following-DNS'> Use the following DS address:</label>
      </p>

      <div className={`${selectedWirelessDNSRadio === 'wireless-automatically-DNS' ? 'IP-inputs' : ''}`}>
        <div>
          <label htmlFor='wireless-preferred-DNS'>Preferred DNS server: <i className='attention'>*</i> </label>
          <input 
            type='text'
            name='wireless-preferred-DNS'
            disabled={selectedWirelessDNSRadio !== 'wireless-following-DNS'}
            required
            onChange={changeWirelessInput}
            value={wirelessOutput.name}
          />
          <div style={{color: 'red'}}>
            {wirelessDNSError}
          </div>
        </div>
        <div>
          <label htmlFor='wireless-alternative-DNS'>Alternative DNS server: </label>
          <input
            type='text'
            name='wireless-alternative-DNS'
            disabled={selectedWirelessDNSRadio !== 'wireless-following-DNS'}
            onChange={changeWirelessInput}
            value={wirelessOutput.name}
          />
        </div>
      </div>
    </div>
  )
}

export default WirelessSection