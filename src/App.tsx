import { useState } from 'react';
import './App.css'
import ArrowIcon from "./assets/icon-arrow.svg"
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {z} from "zod";
import ageCalculator from './ageCalculator';

// const monthDays: number[] =[31,28,31,30,31,30,31,31,30,31,30,31]

const date = z.object({
    day: z.number().min(1,"Must be valid day").max(31,"Must be valid day"),
    month: z.number().min(1,"Must be valid month").max(12,"Must be valid month"),
    year: z.number().min(0,"Must be valid year").max(new Date().getFullYear(),"Must be in the past")
  }) 

type dateType = z.infer<typeof date>;

const App = () => {

    const [dateState, setDateState] = useState(
      {
        day:-1,
        month:-1,
        year:-1
      }
    );

    const { register, handleSubmit, formState: { errors },} = useForm<dateType>({    
      resolver: zodResolver(date),
      mode: "onTouched",
      reValidateMode:"onSubmit",
    });

    const onSubmit = handleSubmit( async (data:dateType) =>{
      const today = new Date();
      const result = ageCalculator(
            data,
            {day:today.getDay(),month: today.getMonth(), year: today.getFullYear()})
      setDateState(result);

    })


    return (
      <div className='flex  justify-center items-center  min-h-screen max-w-screen'>
      <main className='w-[355px] md:w-[550px] bg-white rounded-2xl rounded-br-[5em] p-5 mx-auto '>
        <form onSubmit={onSubmit}>
          
          <div className='flex my-5 mb-7 md:w-80'>

            <div className='flex flex-col items-start mx-3 '>
              <label className='text-xs font-bold'>DAY</label>
              <input
                className='h-[60px] text-2xl p-3 font-bold rounded-lg w-20 md:w-28 border-2 border-slate-300 focus:border-slate-700 hover:border-slate-600'
                type='text'
                {...register("day",{required: "Required", valueAsNumber:true })}
                aria-invalid={errors.day? true: false}
                placeholder='DD'
              />
              {errors.day && <p className='italic text-xs text-red-600'>{errors.day.message}</p>}
            </div>

            <div className='flex flex-col items-start mx-3 '>
              <label className='text-xs font-bold'>MONTH</label>
              <input
              className='h-[60px] text-2xl p-3 font-bold rounded-lg w-20 md:w-28 border-2 border-slate-300 focus:border-slate-700 hover:border-slate-600'
              type='text'
                {...register("month",{required: "Month is required", valueAsNumber:true},)}
                aria-invalid={errors.month? true: false}
                placeholder='MM'
              />
              {errors.month && <p className=' italic text-xs text-red-600'>{errors.month.message}</p>}
            </div>

            <div className='flex flex-col items-start mx-3'>
              <label className='text-xs font-bold'>YEAR</label>
              <input
              className='h-[60px] text-2xl p-3 font-bold rounded-lg w-24 md:w-28 border-2 border-slate-300 focus:border-slate-700 hover:border-slate-600'
              type='text'
              {...register("year",{required: "Year is required", valueAsNumber:true,})}
              placeholder='YYYY'
              aria-invalid={errors.year? true: false}
              />
              {errors.year && <p className='italic text-xs text-red-600'>{errors.year.message}</p>}
            </div>
          </div>

          <div className=''>
            <div className='p-4 md:pr-7 mt-2 -mb-10'><hr className='font-bold w-full' /></div>
            <button type="submit" className='-mt-1 md:mr-0 md:ml-96 text-white bg-purple-600 rounded-full p-4'>
              <img src={ArrowIcon} alt="Arrow Icon" width={30} height={30}/>
            </button>
          </div>
        </form>

        <div className='flex-col 
                        m-3 
                        mt-8 
                        text-5xl
                        md:text-7xl 
                        pl-0
                        font-extrabold 
                        italic
                        text-left'>
          <div className=''><span className='text-purple-600'>{(dateState.year == -1)? "--": dateState.year}</span> years</div>
          <div className=''><span className='text-purple-600'>{(dateState.month == -1)? "--": dateState.month}</span> months</div>
          <div className=''><span className='text-purple-600'>{(dateState.day == -1)? "--": dateState.day}</span> days</div>
        </div>
      </main>
      </div>
      );
  }

export default App;
