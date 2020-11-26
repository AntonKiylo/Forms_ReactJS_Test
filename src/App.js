import './App.css'
import EthernetSection from './components/ethernet//EthernetSection'
import WirelessSection from './components/wireless/WirelessSection'
import SubmitSection from './components/submit/SubmitSection'
import { useState } from 'react'

function App() {
  const [isWiFiEnabled, setIsWiFiEnabled] = useState(false)
  const [selectedEthernetIPRadio, setSelectedEthernetIPRadio] = useState('ethernet-automatically-IP')
  const [selectedEthernetDNSRadio, setSelectedEthernetDNSRadio] = useState('ethernet-automatically-DNS')
  
  const [selectedWirelessIPRadio, setSelectedWirelessIPRadio] = useState('wireless-automatically-IP')
  const [selectedWirelessDNSRadio, setSelectedWirelessDNSRadio] = useState('wireless-automatically-DNS')

  const [ethernetOutput, setEthernetOutput] = useState({})
  const [wirelessOutput, setWirelessOutput] = useState({})

  const [ethernetIPError, setEthernetIPError] = useState('')
  const [ethernetDNSError, setEthernetDNSError] = useState('')
  const [ethernetSubnetMaskError, setEthernetSubnetMaskError] = useState('')
  
  const [wirelessIPError, setWirelessIPError] = useState('')
  const [wirelessDNSError, setWirelessDNSError] = useState('')
  const [wirelessSubnetMaskError, setWirelessSubnetMaskError] = useState('')
  
  const clearErrors = () => {
    setEthernetDNSError('')
    setEthernetIPError('')
    setEthernetSubnetMaskError('')

    setWirelessIPError('')
    setWirelessDNSError('')
    setWirelessSubnetMaskError('')
  }

  const validateEthernet = () => {
      let ethernetIP = ''
      let ethernetDNS = ''
      let ethernetSubnetMask = ''

      if (Object.keys(ethernetOutput).length === 0) {
        return false
      }

      if (ethernetOutput['ethernet-IP-address'] && !ethernetOutput['ethernet-IP-address'].match(/^([0-9]{1,3})\.([0-9]{1,3})\.([0-9]{1,3})\.([0-9]{1,3})$/)) {
        ethernetIP = "IP-address must contains numbers and be xxx.xxx.xxx.xxx format"
      }
      
      if (ethernetOutput['ethernet-subnet-mask'] && !ethernetOutput['ethernet-subnet-mask'].match(/^(((255\.){3}(255|254|252|248|240|224|192|128|0+))|((255\.){2}(255|254|252|248|240|224|192|128|0+)\.0)|((255\.)(255|254|252|248|240|224|192|128|0+)(\.0+){2})|((255|254|252|248|240|224|192|128|0+)(\.0+){3}))$/)) {
        ethernetSubnetMask = "Subnet Mask must contains numbers and be x.x.x.x format"
      }

      if (ethernetOutput['ethernet-preferred-DNS'] && !ethernetOutput['ethernet-preferred-DNS'].match(/^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$|^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9])\.)+([A-Za-z]|[A-Za-z][A-Za-z0-9-]*[A-Za-z0-9])$/)) {
        ethernetDNS = "DNS must be xxxx.xxx"
      }
  
      if (ethernetIP || ethernetDNS || ethernetSubnetMask) {
        setEthernetIPError(ethernetIP)
        setEthernetDNSError(ethernetDNS)
        setEthernetSubnetMaskError(ethernetSubnetMask)
        return false
      }
  
      return true
  }

  const validateWireless = () => {
    let wirelessIP = ''
    let wirelessDNS = ''
    let wirelessSubnetMask = ''
    
    if (Object.keys(wirelessOutput).length === 0) {
      return false
    }

    if (wirelessOutput['wireless-IP-address'] && !wirelessOutput['wireless-IP-address'].match(/^([0-9]{1,3})\.([0-9]{1,3})\.([0-9]{1,3})\.([0-9]{1,3})$/)) {
      wirelessIP = "IP-address must contains numbers and be xxx.xxx.xxx.xxx format"
    }
    
    if (wirelessOutput['wireless-subnet-mask'] && !wirelessOutput['wireless-subnet-mask'].match(/^(((255\.){3}(255|254|252|248|240|224|192|128|0+))|((255\.){2}(255|254|252|248|240|224|192|128|0+)\.0)|((255\.)(255|254|252|248|240|224|192|128|0+)(\.0+){2})|((255|254|252|248|240|224|192|128|0+)(\.0+){3}))$/)) {
      wirelessSubnetMask = "Subnet Mask must contains numbers and be x.x.x.x format"
    }

    if (wirelessOutput['wireless-preferred-DNS'] && !wirelessOutput['wireless-preferred-DNS'].match(/^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$|^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9])\.)+([A-Za-z]|[A-Za-z][A-Za-z0-9-]*[A-Za-z0-9])$/)) {
      wirelessDNS = "DNS must be xxxx.xxx"
    }

    if (wirelessIP || wirelessDNS || wirelessSubnetMask) {
      setWirelessIPError(wirelessIP)
      setWirelessDNSError(wirelessDNS)
      setWirelessSubnetMaskError(wirelessSubnetMask)
      return false
    }

    return true
  }

  const onHandlerSubmit = e => {
    e.preventDefault()
  
    let isValidEthernet = validateEthernet()
    let isValidWireless = validateWireless()

    if (isValidEthernet) {
      console.log(JSON.stringify(ethernetOutput))
      document.querySelector('form').reset()
      clearErrors()
      setEthernetOutput({})
    }
        
    if (isValidWireless) {
      console.log(JSON.stringify(wirelessOutput))
      document.querySelector('form').reset()
      clearErrors()
      setWirelessOutput({})
    }
  }

  return (
    <form onSubmit={onHandlerSubmit}>
      <EthernetSection
        selectedEthernetIPRadio={selectedEthernetIPRadio}
        setSelectedEthernetIPRadio={setSelectedEthernetIPRadio}
        selectedEthernetDNSRadio={selectedEthernetDNSRadio}
        setSelectedEthernetDNSRadio={setSelectedEthernetDNSRadio}
        ethernetOutput={ethernetOutput}
        setEthernetOutput={setEthernetOutput}
        isWiFiEnabled={isWiFiEnabled}
        ethernetIPError={ethernetIPError}
        ethernetDNSError={ethernetDNSError}
        ethernetSubnetMaskError={ethernetSubnetMaskError}
      />
      <WirelessSection
        selectedWirelessIPRadio={selectedWirelessIPRadio}
        setSelectedWirelessIPRadio={setSelectedWirelessIPRadio}
        selectedWirelessDNSRadio={selectedWirelessDNSRadio}
        setSelectedWirelessDNSRadio={setSelectedWirelessDNSRadio}
        isWiFiEnabled={isWiFiEnabled}
        setIsWiFiEnabled={setIsWiFiEnabled}
        setEthernetOutput={setEthernetOutput}
        setWirelessOutput={setWirelessOutput}
        wirelessOutput={wirelessOutput}
        clearErrors={clearErrors}
        wirelessIPError={wirelessIPError}
        wirelessDNSError={wirelessDNSError}
        wirelessSubnetMaskError={wirelessSubnetMaskError}
      />
      <SubmitSection
        setEthernetOutput={setEthernetOutput}
        setWirelessOutput={setWirelessOutput}
        clearErrors={clearErrors}
      />
    </form>
  )
}

export default App