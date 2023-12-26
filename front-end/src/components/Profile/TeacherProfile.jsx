import { useAuth } from '../../AuthContext'
import { EmailSection, PhoneSection } from '../../components/Profile'
import { Input } from '../Globals'

const TeacherProfile = () => {
  const { auth } = useAuth()
  return (
    <div className='grid grid-cols-2 gap-4'>
      <div>
        <div className='flex flex-col grow gap-3 mb-[30px]'>
          <h3 className='text-thirdColor'>Informations</h3>
          <div className='flex flex-col gap-[22px] max-w-[365px]'>
            <div className='relative flex'>
              <Input
                className='grow'
                inputProps={{
                  value: auth?.username,
                  disabled: true,
                }}
                icon='tag-user'
              />
            </div>
            <Input
              inputProps={{
                value: auth?.person?.matricule,
                disabled: true,
              }}
              icon='id'
            />
            <Input
              inputProps={{
                value: auth?.person?.establishment?.name,
                disabled: true,
              }}
              icon='house'
            />
            <Input
              inputProps={{
                value: auth?.person?.speciality?.name,
                disabled: true,
              }}
              icon='book-square'
            />
            <Input
              inputProps={{
                value: auth?.person?.grade?.name,
                disabled: true,
              }}
              icon='grade'
            />
            <Input
              inputProps={{
                value: auth?.person?.birthday,
                disabled: true,
              }}
              icon='calendar'
            />
            <Input
              inputProps={{
                value: auth?.person?.birth_place,
                disabled: true,
              }}
              icon='tag-user'
            />
          </div>
        </div>
        <EmailSection />
      </div>
      <PhoneSection className='mb-[15px]' />
    </div>
  )
}

export default TeacherProfile
