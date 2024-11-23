import React from "react"

const Settings = () => {
  return (
    <section className='bg-white rounded-2xl card-shadow p-4 sm:p-5 lg:p-6'>
      <header className='border-b-2 mb-3.5 sm:mb-4 lg:mb-5'>
        <h1
          className='text-lg lg:text-[22px] font-semibold text-brand-neutral-800 inline-block pb-3.5 border-brand-blue'
          style={{ lineHeight: 1 }}
        >
          Settings
        </h1>
      </header>

      <div className='flex flex-col gap-4'>
        <div>
          <h5 className='text-base lg:text-lg font-semibold text-brand-neutral-800 inline-block'>Account management</h5>
          <p className='text-sm sm:text-base text-brand-neutral-600 md:leading-relaxed'>
            Control other options to manage your data, like deleting your account.
          </p>
        </div>
      </div>
    </section>
  )
}

export default Settings
