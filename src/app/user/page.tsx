'use client'

import React, { RefObject, useEffect, useRef, useState } from 'react'
import { useForm, SubmitHandler } from "react-hook-form"  

import { createUser, deleteUser, editUser, fetchUsers } from '@/controllers/user.controllers'

import Header from '@/components/Header'
import Footer from '@/components/Footer'


type UsersProps ={
    id: number;
    nome: string;
    email: string;
    data_de_nascimento: string;
}[]

type UserProp = {
  id: number;
    nome: string;
    email: string;
    data_de_nascimento: string;
}

interface DialogRefType {
  openDialog: () => void;
  closeDialog: () => void;
}


const UserHome = () => {
  const [users, setUsers] = useState<UsersProps>([])
  const [user, setUser] = useState<UserProp>()
  const [formOption, setFormOption] = useState(false)

  const dialogRef: RefObject<HTMLDialogElement> = useRef(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset
  } = useForm<UserProp>()

  const onSubmit: SubmitHandler<UserProp> = (data) => {
    console.log(formOption)
    if(formOption) {
      editUser(user?.id, user, data, setUsers)
    }
    if(!formOption) {
      console.log('create')
      createUser(data, setUsers)
    }
    
    reset()
  }
  useEffect(() => {
    fetchUsers(setUsers)
  }, [])
  return (
    <>
    <div className='flex justify-center min-h-screen max-h-fit w-screen'>
      <div className='flex flex-col w-2/4'>
        <Header/>
        <main className='flex justify-center items-center flex-col m-5'>
          <div className='flex justify-between w-full '>
            <input type="text" placeholder='Pesquisar por nome' className='border-2 rounded-lg p-5 '/>
            <button onClick={() => hanldeCreateUser(dialogRef, setUser , setFormOption)} className='cursor-pointer border-2 rounded-lg p-5'> Adicionar Usuário</button>
          </div>
          <table className='border p-5 m-10'>
            <caption className='text-lg'>Usuários</caption>
            <thead>
              <tr>
                <th scope="col">Nome</th>
                <th scope="col">Email</th>
                <th scope="col">Data de Nascimento</th>
                <th scope="col">Ações</th>
              </tr>
            </thead>
            <tbody>
              {users ? users.map((user) => (
                <tr key={user.id}>
                  <th>{user.nome}</th>
                  <th>{user.email}</th>
                  <th>{user.data_de_nascimento}</th>
                  <th>
                    <button onClick={() => hanldeEditeUser(dialogRef, user, setUser, setFormOption)}>Editar</button>
                    <button onClick={() => handleDeleteUser(user.id, setUsers)}>Delete</button>
                  </th>
                </tr>

              )): <span>
                Nenhum usuário encontrado
                </span>}

            </tbody>
          </table>
        </main>
        <dialog ref={dialogRef} className='sm:w-2/5 w-1/5 rounded-lg border-2 border-black'>
            <div className='flex justify-end'>
              <button onClick={() => closeModal(dialogRef, setUser, setFormOption)} className='m-5'>Fechar</button>

            </div>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col p-5'>
              <label htmlFor="nome">Nome:</label>
              <input className='border-2 border-black rounded-lg' type="text"  defaultValue={user?.nome} {...register('nome')}/>
              <label htmlFor="email">Email:</label>
              <input className='border-2 border-black rounded-lg' type="email"  defaultValue={user?.email} {...register('email')}/>
              <label htmlFor="data_de_nascimento">Data de nascimento:</label>
              <input className='border-2 border-black rounded-lg' type="date"   defaultValue={user?.data_de_nascimento} {...register('data_de_nascimento')}/>
              <div className='flex justify-center'>
                {formOption ? (
                  <button onClick={() => closeModal(dialogRef, setUser, setFormOption)} className='p-2 bg-blue-500 w-1/4 rounded-lg mt-5 text-white' type='submit'>Editar</button>
                  
                  ) : 
                  <button onClick={() => closeModal(dialogRef, setUser, setFormOption)} className='p-2 bg-blue-500 w-1/4 rounded-lg mt-5 text-white' type='submit'>Salvar</button>
                }

              </div>
            </form>
        </dialog>
        <Footer/>
      </div>
    </div>
    </>
  )
}

export default UserHome

function showModal(dialogRef: RefObject<HTMLDialogElement>) {
  dialogRef.current?.showModal()
}

function closeModal(dialogRef: RefObject<HTMLDialogElement>, setUser, setFormOption) {
  dialogRef.current?.close()
}

function handleDeleteUser(userId, setUsers) {
  deleteUser(userId, setUsers)
}

function hanldeEditeUser(dialogRef: RefObject<HTMLDialogElement>, user, setUser, setFormOption) {
  setUser(user)
  console.log(user.id)
  setFormOption(true)
  dialogRef.current?.showModal()
}

function hanldeCreateUser(dialogRef: RefObject<HTMLDialogElement>, setUser, setFormOption) {
  setFormOption(false)
  dialogRef.current?.showModal()

  setUser('')
}