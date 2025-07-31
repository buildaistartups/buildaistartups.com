import Image from 'next/image'
import Team01 from '@/public/images/team-01.png'
import Team02 from '@/public/images/team-02.png'
import Team03 from '@/public/images/team-03.png'
import Team04 from '@/public/images/team-04.png'

const team = [
  {
    img: Team01,
    name: 'Alice Anderson',
    role: 'CEO',
  },
  {
    img: Team02,
    name: 'Bob Brown',
    role: 'CTO',
  },
  {
    img: Team03,
    name: 'Carol Chen',
    role: 'Lead Engineer',
  },
  {
    img: Team04,
    name: 'David Diaz',
    role: 'Product Manager',
  },
]

export default function Team() {
  return (
    <section className="relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20">
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            <h2 className="h2 text-gray-900 dark:text-slate-100">Meet the Team</h2>
            <p className="text-lg text-gray-600 dark:text-slate-400">Our experienced leaders bring expertise from across the tech industry.</p>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <div key={i} className="flex flex-col items-center bg-white dark:bg-slate-900 shadow-lg rounded-xl p-6">
                <Image src={member.img} alt={member.name} width={96} height={96} className="rounded-full mb-4" />
                <div className="font-bold text-gray-900 dark:text-slate-100">{member.name}</div>
                <div className="text-sm text-gray-600 dark:text-slate-400">{member.role}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
