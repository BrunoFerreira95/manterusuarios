'use client'

import React, { RefObject, useEffect, useRef, useState } from 'react'
import { useForm, SubmitHandler } from "react-hook-form"  
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

import { createUser, deleteUser, editUser, fetchUsers } from '@/controllers/user.controllers'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { formatDataBrasileiraParaISO, formatDateToBr } from '@/utils/formatData'


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

const schema = yup
  .object({
    nome: yup.string().required(),
    email: yup.string().email().required(),
    data_de_nascimento: yup.date().required()
  })
  .required()

const UserHome = () => {
  const [users, setUsers] = useState<UsersProps>([])
  const [user, setUser] = useState<UserProp>()
  const [formOption, setFormOption] = useState(false)
  const [search, setSearch] = useState('')
  const [filterUsers, setfilterUsers] = useState<UsersProps>([])
  
  const dialogRef: RefObject<HTMLDialogElement> = useRef(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset
  } = useForm({
    resolver: yupResolver(schema),
  }) 

  const onSubmit: SubmitHandler<schema> = (data) => {
    if(formOption) {
      editUser(user?.id, user, data, setUsers)
      closeModal(dialogRef, setUser, setFormOption)
    }
    if(!formOption) {
      createUser(data, setUsers)
      closeModal(dialogRef, setUser, setFormOption)
    }
    
    reset()
  }
  useEffect(() => {
    fetchUsers(setUsers)
  }, [])

  useEffect(() => {
    filterUsersByName(search, users, setfilterUsers)
  }, [search, users])
  return (
    <>
    <div className='flex justify-center min-h-screen max-h-fit w-screen'>
      <div className='flex flex-col w-2/4'>
        <Header/>
        <main className='flex justify-center items-center flex-col m-5'>
          <div className='flex justify-between w-full '>
            <input type="text" onChange={(e) => setSearch(e.target.value)} placeholder='Pesquisar por nome' className='border-2 rounded-lg p-5 '/>
            <button onClick={() => hanldeCreateUser(dialogRef, setUser , setFormOption)} className='cursor-pointer border-2 rounded-lg p-5'> Adicionar Usuário</button>
          </div>
          <table className='border p-5 m-10'>
            <caption className='text-lg'>Usuários</caption>
            <thead>
              <tr className='border-2 border-black p-2'>
                <th className='border-2 border-black p-2' scope="col">Nome</th>
                <th className='border-2 border-black p-2' scope="col">Email</th>
                <th className='border-2 border-black p-2' scope="col">Data de Nascimento</th>
                <th className='border-2 border-black p-2' scope="col">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filterUsers ? filterUsers.map((user) => (
                <tr key={user.id}>
                  <th className='border-2 border-black p-2'>{user.nome}</th>
                  <th className='border-2 border-black p-2'>{user.email}</th>
                  <th className='border-2 border-black p-2'>{formatDateToBr(user.data_de_nascimento)}</th>
                  <th className='border-2 border-black p-2'>
                    <button onClick={() => hanldeEditeUser(dialogRef, user, setUser, setFormOption)}>Editar</button>
                    <br/ >
                    <button onClick={() => handleDeleteUser(user.id, setUsers)}>Delete</button>
                  </th>
                </tr>

              )): null}

            </tbody>
          </table>
        </main>
        <dialog ref={dialogRef} className='sm:w-1/4 w-1/5 rounded-lg border-2 border-black'>
            <div className='flex justify-end'>
              <button onClick={() => closeModal(dialogRef, setUser, setFormOption)} className='m-5'>Fechar</button>

            </div>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col p-5'>
              <label htmlFor="nome">Nome:</label>
              <input className='border-2 border-black rounded-lg' type="text"  defaultValue={user?.nome} {...register('nome')}/>
              <label htmlFor="email">Email:</label>
              <p>{errors.nome?.message}</p>
              <input className='border-2 border-black rounded-lg' type="email"  defaultValue={user?.email} {...register('email')}/>
              <p>{errors.email?.message}</p>
              <label htmlFor="data_de_nascimento">Data de nascimento:</label>
              <input className='border-2 border-black rounded-lg' type="date"   defaultValue={formatDataBrasileiraParaISO(user?.data_de_nascimento)} {...register('data_de_nascimento')}/>
                <p>{errors.data_de_nascimento?.message}</p>
              <div className='flex justify-center'>
                {formOption ? (
                  <button className='p-2 bg-blue-500 w-1/4 rounded-lg mt-5 text-white' type='submit'>Editar</button>
                  
                  ) : 
                  <button className='p-2 bg-blue-500 w-1/4 rounded-lg mt-5 text-white' type='submit'>Salvar</button>
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
  setUser('')
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

// Função para filtrar os usuários pelo nome
function filterUsersByName(name, users, setfilterUsers) {
  const filteredUsers = users.filter(user => {
    // Transforma o nome do usuário e o termo de filtro em letras minúsculas
    const userNomeLowerCase = user.nome.toLowerCase();
    const filterNomeLowerCase = name.toLowerCase();

    // Verifica se o nome do usuário contém o termo de filtro
    return userNomeLowerCase.includes(filterNomeLowerCase);
  });

  setfilterUsers(filteredUsers);
}