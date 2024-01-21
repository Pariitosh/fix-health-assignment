import { Button, Flex, NativeSelect, TextInput, Textarea, Title } from '@mantine/core'
import './App.css'
import { useState } from 'react'
import { useForm } from '@mantine/form';

function App() {
  const [step,setStep]=useState('a')
  const test={mumbai: ['Dr. Smith', 'Dr. Johnson', 'Dr. Williams'],
  delhi: ['Dr. Brown', 'Dr. Davis', 'Dr. Miller'],
  chennai: ['Dr. Wilson', 'Dr. Moore', 'Dr. Taylor'],
  kolkata: ['Dr. Anderson', 'Dr. Thomas', 'Dr. Jackson'],
  bangalore: ['Dr. White', 'Dr. Harris', 'Dr. Martin'],
  hyderabad: ['Dr. Garcia', 'Dr. Martinez', 'Dr. Robinson'],
  ahmedabad: ['Dr. Clark', 'Dr. Rodriguez', 'Dr. Lewis'],
  pune: ['Dr. Lee', 'Dr. Walker', 'Dr. Hall'],
  surat: ['Dr. Allen', 'Dr. Young', 'Dr. Hernandez'],
  jaipur: ['Dr. King', 'Dr. Wright', 'Dr. Hill'],
  lucknow: ['Dr. Scott', 'Dr. Green', 'Dr. Adams'],
  kanpur: ['Dr. Baker', 'Dr. Nelson', 'Dr. Carter'],
  nagpur: ['Dr. Mitchell', 'Dr. Perez', 'Dr. Roberts'],
  indore: ['Dr. Turner', 'Dr. Phillips', 'Dr. Campbell'],
  thane: ['Dr. Parker', 'Dr. Evans', 'Dr. Edwards'],
  bhopal: ['Dr. Collins', 'Dr. Stewart', 'Dr. Sanchez'],
  visakhapatnam: ['Dr. Morris', 'Dr. Rogers', 'Dr. Reed'],
  patna: ['Dr. Cook', 'Dr. Morgan', 'Dr. Bell'],
  vadodara: ['Dr. Murphy', 'Dr. Bailey', 'Dr. Rivera'],
  ghaziabad: ['Dr. Cooper', 'Dr. Cox', 'Dr. Richardson'],
  ludhiana: ['Dr. Wood', 'Dr. Ward', 'Dr. Watson'],
  agra: ['Dr. Brooks', 'Dr. Bennett', 'Dr. Gray'],
  nashik: ['Dr. James', 'Dr. Hayes', 'Dr. Fox'],
  faridabad: ['Dr. Tucker', 'Dr. Medina', 'Dr. Kim'],
  meerut: ['Dr. Spencer', 'Dr. Fuller', 'Dr. Hubbard'],
  rajkot: ['Dr. Hunt', 'Dr. Herrera', 'Dr. Bowman'],
  varanasi: ['Dr. McDaniel', 'Dr. Hodge', 'Dr. Russo'],
  srinagar: ['Dr. Ballard', 'Dr. Cline', 'Dr. Pope'],
  aurangabad: ['Dr. Wilkins', 'Dr. Yates', 'Dr. Becker'],
  dhanbad: ['Dr. Erickson', 'Dr. Steele', 'Dr. Pruitt'],
  amritsar: ['Dr. Malone', 'Dr. McLaughlin', 'Dr. Haley'],
  allahabad: ['Dr. Malone', 'Dr. Brock', 'Dr. Poole'],
  ranchi: ['Dr. Blair', 'Dr. Lester', 'Dr. Livingston'],
  howrah: ['Dr. Orr', 'Dr. Norman', 'Dr. Norton'],
  coimbatore: ['Dr. Malone', 'Dr. Nash', 'Dr. Newton'],
  jabalpur: ['Dr. Osborn', 'Dr. York', 'Dr. Wilkins'],
  gwalior: ['Dr. Davenport', 'Dr. Kirk', 'Dr. Dennis'],
  vijayawada: ['Dr. Petty', 'Dr. Harper', 'Dr. Armstrong'],
  jodhpur: ['Dr. Boyer', 'Dr. Cohen', 'Dr. Dixon'],
  madurai: ['Dr. Moon', 'Dr. Mcclure', 'Dr. Haas'],
  raipur: ['Dr. Ashley', 'Dr. Conway', 'Dr. Mccall'],
  kota: ['Dr. Shannon', 'Dr. Mullins', 'Dr. Walls'],
  guwahati: ['Dr. Mckinney', 'Dr. Kaufman', 'Dr. Knox'],
  solapur: ['Dr. Parrish', 'Dr. Mercer', 'Dr. Skinner'],
  trivandrum: ['Dr. Mcintyre', 'Dr. Mccormick', 'Dr. Mcbride'],
  jalandhar: ['Dr. Barrera', 'Dr. Knapp', 'Dr. Kline'],
  bareilly: ['Dr. Dickerson', 'Dr. Sexton', 'Dr. Mcbride'],
}
  
            
  const [data, setData] = useState(null);
  const form = useForm({initialValues: {name: '',phone:'',age:'',city:'',company:'',complaint:'',experience:''}});


  const checkAge=()=>{
    if (form.values.age>'40') setStep('d')
    else getDoctors()
  }


  const getDoctors=()=>{
      setStep('e')
      
      
  }
  const getData=()=>{
    setStep('c')
    const fetchData = async () => {
      try {
        const response = await fetch('https://fix-health-api.vercel.app/api');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setData(result.data);
        console.log(result.data,form.values)
      } catch (error) {
        
      } 
      
    };

    fetchData();
  }
  const cities=['Noida','Gurgaon','Delhi','Chennai','Bangalore','Hyderabad','Pune','Lucknow','Ghaziabad','Faridabad',]
  return (
    <>
    <div className='bg'></div>
    <div className='main'>
    <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <Flex h={'50vh'} w={'25vw'} bg={'#0a0a0a'} ml={'50vw'} justify={'center'} align={'center'} style={{borderRadius:"20px",border:"1px solid #333333"}}>
          <Flex h={'80%'} w={'80%'} bg={'#0a0a0a'} align={'center'} direction={'column'} justify={'space-between'} >
            {step!=='e' && <Title style={{color:"white"}}>Book An Appointment</Title>}
            
            {step==='a' && <>
            <TextInput {...form.getInputProps('name')} label={'Name'} size='lg' style={{color:"white"}} w={'80%'} placeholder='Enter your name'></TextInput>
            <TextInput {...form.getInputProps('phone')} label={'Phone Number'}  style={{color:"white"}} size='lg'  w={'80%'} placeholder='Enter your phone number'></TextInput>
            <Button onClick={()=>setStep('b')} variant='filled' >Continue</Button>
            </>}

            {step==='b' && <>
            <TextInput {...form.getInputProps('age')} label={'Age'} size='md' style={{color:"white"}} w={'80%'} placeholder='Enter your Age'></TextInput>
            <NativeSelect {...form.getInputProps('city')} label={'City'} data={cities} size='md' style={{color:"white"}} w={'80%'} placeholder='Enter your city'></NativeSelect>
            <TextInput {...form.getInputProps('company')}label={'Company'} size='md' style={{color:"white"}}  w={'80%'} placeholder='Enter your company name'></TextInput>
            <Button onClick={getData} variant='filled' >Continue</Button>
            </>}

            {step==='c' && <>
            <Textarea {...form.getInputProps('complaint')} label={'Chief complaint'} w={'90%'} size='xl' style={{color:"white"}} placeholder='Describe your complaint in detail'> </Textarea>
            <Button size='xl' onClick={checkAge} variant='filled' >Continue</Button>
            </>}
            {step==='d' && <>
            <NativeSelect {...form.getInputProps('experience')}  style={{color:"white"}} size='xl' label='Any previous experience with physiotherapy?' data={['Yes','No']}></NativeSelect>
            <Button size='xl' onClick={getDoctors} variant='filled' >Continue</Button>
            </>}

            {step==='e' && <>
            <Title order={1} style={{color:"white"}}>Top doctors in {form.values.city} </Title>
            <Flex h={'85%'} w={'100%'} bg={'blue'} direction={'column'} align={'center'} >
              {data.form.values.city.map((doctor)=>(<Title mb={'3%'} key={doctor}>{doctor}</Title>))}
            </Flex>
            </>}

            
            
          </Flex>
        </Flex>
    </form>
    </div>
    </>
  )
}

export default App
