"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { signUpCredentials } from '@/lib/action'
import Link from 'next/link'
import { useActionState } from 'react'

const FormRegister = () => {
    const [state, formAction] = useActionState(signUpCredentials, null)

    return (
        <div className="w-[30%] mx-auto shadow text-center py-10 px-10">
            <div>
                <h1 className="text-xl font-bold mb-5">Sign Up</h1>
                <hr />
                <div>
                </div>
            </div>
            <form action={formAction} className="text-left">
                <div className="my-4 flex flex-col gap-3">
                    <Label htmlFor="name">Name</Label>
                    <Input type="name" name="name" placeholder="Enter your name" />
                    <span className='text-sm text-rose-500'>{state?.error?.name}</span>
                </div>
                <div className="my-4 flex flex-col gap-3">
                    <Label htmlFor="email">Email <span className='text-red-600'>*</span></Label>
                    <Input type="email" name="email" placeholder="Enter your email" />
                    <span className='text-sm text-rose-500'>{state?.error?.email}</span>
                </div>
                <div className="my-4 flex flex-col gap-3">
                    <Label htmlFor="password">Password <span className='text-red-600'>*</span></Label>
                    <Input type="Password" name="password" placeholder="Enter your password" />
                    <span className='text-sm text-rose-500'>{state?.error?.password}</span>
                </div>
                <div className="my-4 flex flex-col gap-3">
                    <Label htmlFor="confirmPassword">Confirm Password <span className='text-red-600'>*</span></Label>
                    <Input type="password" name="confirmPassword" placeholder="Enter your confirmPassword" />
                    <span className='text-sm text-rose-500'>{state?.error?.confirmPassword}</span>
                </div>
                <div className='my-3'>
                    <Button type="submit" className="w-full bg-red-500">Register</Button>
                </div>
                <div className="text-center text-sm">
                    <span>Already registered? <Link href={'/sign-in'} className="underline">Sign in here</Link></span>
                </div>
            </form>
            <div className="my-3 flex items-center gap-5">
                <hr className="w-64 h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
                <span>or</span>
                <hr className="w-64 h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
            </div>
            {/* <div className="flex items-center justify-between gap-5 ">
                    <button onClick={() => signIn('github')} className="flex items-center gap-3 bg-black my-2 px-4 py-2 rounded-md text-white w-fit">
                        <span>
                            <Github  size={20} />
                        </span>
                        <h3>Continue with Github</h3>
                    </button>
                    <button onClick={() => signIn('google')} className="flex items-center gap-3 bg-[#DD4B39] my-2 px-4 py-2 rounded-md text-white w-fit">
                        <span>
                            <AiOutlineGoogle size={20} />
                        </span>
                        <h3>Continue with Google</h3>
                    </button>
                </div> */}

        </div>
    )
}

export default FormRegister