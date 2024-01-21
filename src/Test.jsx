import { Button, Flex, NativeSelect, TextInput, Textarea, Title,BackgroundImage, Avatar, Text } from '@mantine/core'
import './App.css'
import { useEffect, useState } from 'react'
import { useForm } from '@mantine/form';

import Testimonials from './Testimonials';

function Test() {
    const [data, setData] = useState(null);
    const form = useForm({initialValues: {name: '',phone:'',age:'',city:'Noida',company:'',complaint:'',experience:''}});


  const checkAge=()=>{
    if (form.values.age>40) setStep('d')
    else getDoctors()
  }

  const [doctors,setDoctors]=useState()
 
  
  const cities=['Noida','Gurgaon','Delhi','Chennai','Bangalore','Hyderabad','Pune','Lucknow','Ghaziabad','Faridabad',]
    const [step,setStep]=useState('a')
    const [city,setCity]=useState()
    useEffect(()=>{
        
        const pathSegments = window.location.pathname.split('/');
       
        if (pathSegments[1]!==''){
            getDoctors()
            setCity(pathSegments[1])
            setStep('path')
        }
        
      })
      const getDoctors=(values)=>{
       
          setStep('e')
          const fetchData = async () => {
            try {
              const response = await fetch('https://fix-health-api.vercel.app/api');
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
              const result = await response.json();
              setData(result.data);
              const city=form.values.city
              
            } catch (error) {
              
            } 
            
          };
      
          fetchData();
      }
    return(
        <>
        <form onSubmit={form.onSubmit((values) => getDoctors(values))}>
        <Flex h={'100vh'} w={'100vw'}  style={{position:'relative'}}>
            <BackgroundImage src='test.png'></BackgroundImage>
            
            <Flex  h={'50vh'} w={'25vw'} bg={'#0a0a0a'} ml={'50vw'} mt={'20vh'} justify={'center'} align={'center'} style={{borderRadius:"20px",border:"1px solid #333333",position:"absolute"}}>
          <Flex h={'80%'} w={'80%'} bg={'#0a0a0a'} align={'center'} direction={'column'} justify={'space-between'} >
            {step==='a' && <Title style={{color:"white"}}>Book An Appointment</Title>}
            {step==='b' && <Title style={{color:"white"}}>Book An Appointment</Title>}
            {step==='c' && <Title style={{color:"white"}}>Book An Appointment</Title>}
            {step==='d' && <Title style={{color:"white"}}>Book An Appointment</Title>}
            
            {step==='a' && <>
            <TextInput {...form.getInputProps('name')} label={'Name'} size='lg' style={{color:"white"}} w={'80%'} placeholder='Enter your name'></TextInput>
            <TextInput {...form.getInputProps('phone')} label={'Phone Number'}  style={{color:"white"}} size='lg'  w={'80%'} placeholder='Enter your phone number'></TextInput>
            <Button onClick={()=>{setStep('b')}} variant='filled' >Continue</Button>
            </>}

            {step==='b' && <>
            <TextInput {...form.getInputProps('age')} label={'Age'} size='md' style={{color:"white"}} w={'80%'} placeholder='Enter your Age'></TextInput>
            <NativeSelect {...form.getInputProps('city')} label={'City'} data={cities} size='md' style={{color:"white"}} w={'80%'} placeholder='Enter your city'></NativeSelect>
            <TextInput {...form.getInputProps('company')}label={'Company'} size='md' style={{color:"white"}}  w={'80%'} placeholder='Enter your company name'></TextInput>
            <Button onClick={()=>{setStep('c')}}  variant='filled' >Continue</Button>
            </>}

            {step==='c' && <>
            <Textarea {...form.getInputProps('complaint')} label={'Chief complaint'} w={'90%'} size='xl' style={{color:"white"}} placeholder='Describe your complaint in detail'> </Textarea>
            <Button onClick={checkAge} size='xl' variant='filled' >Continue</Button>
            </>}
            {step==='d' && <>
            <NativeSelect {...form.getInputProps('experience')}  style={{color:"white"}} size='xl' label='Any previous experience with physiotherapy?' data={['Yes','No']}></NativeSelect>
            <Button onClick={getDoctors} size='xl'  variant='filled' >Continue</Button>
            </>}

            {step==='e' && <>
            <Title order={1} style={{color:"white"}}>Top doctors in  {form.values.city} </Title>
            <Flex mt={'15%'} h={'85%'} w={'100%'} bg={'#0a0a0a'} direction={'column'} align={'center'} >
              { data!==null && data[form.values.city].map((doctor)=>(<Title style={{color:"white"}}  mb={'3%'} key={doctor}>{doctor}</Title>))}
            </Flex>
            </>}

            {step==='path' && <>
            <Title order={1} style={{color:"white"}}>Top doctors in  {city} </Title>
            <Flex h={'85%'} w={'100%'} bg={'#0a0a0a'} direction={'column'} align={'center'} >
              { data!==null && data[window.location.pathname.split('/')[1]].map((doctor)=>(<Title style={{color:"white"}} mb={'3%'} key={doctor}>{doctor}</Title>))}
            </Flex>
            </>}

          </Flex>
        </Flex>
        </Flex>
        <Flex h={'80vh'} w={'100vw'} bg={'black'} direction={'column'}>
            <Flex h={'20%'} w={'100%'} bg={'black'} justify={'center'} align={'center'} style={{color:"white"}}>
                <Title>Patient Recovery Stories</Title>
            </Flex>
            <Flex h={'80%'} w={'100%'} bg={'black'} justify={'space-around'} align={'center'}>
                <ReviewCard name={'Nitish Patel, 66'} review={'Your assesment method is so good and patient support resolves issues properly'} color={'orange'} avatar={'NP'}/>
                <ReviewCard name={'Rashmi, 43'} review={'Quality pocket friendly and consistent care is what fix health stands for'} color={'blue'} avatar={'R'}/>
                <ReviewCard name={'Pranjal Deep, 29'} review={'They worked around time zone variations to accomodate my schedule'} color={'green'} avatar={'PD'}/>
            </Flex>
        </Flex>
        </form>
        </>
    )
}
const ReviewCard=({review,name,color,avatar})=>{
    return (
        <Flex h={'90%'} w={'25%'}  direction={'column'} align={'center'} justify={'space-between'} style={{borderRadius:"20px",border:"1px solid #333333"}}>
            <Flex h={'50%'} w={'100%'} bg={'#0a0a0a'} style={{borderRadius:"20px",border:"1px solid #333333"}} justify={'center'} align={'center'}>
                <Title ml={'5%'} mr={'5%'} order={2} style={{color:"white"}}>
                {review}
                </Title>
            </Flex>
            <Avatar size={'xl'} color={color}>{avatar}</Avatar>
            <Title mb={'10%'} style={{color:"white"}} order={3} >{name}</Title>
        </Flex>
    )
}
export default Test