'use client';

export default function Button({ children, className, onClick, color = 'white' }) {
  return (
    <div
      className={`
        w-fit h-7 leading-7 px-4
        shadow rounded transition select-none
        ${getStyles(color)} ${className}`
      }
      onClick={onClick}
    >
      {children}
    </div>
  )
}

const styles = {
  white: [
    'bg-white',
    'text-black',
    'shadow-white',
    'hover:bg-slate-400',
    'active:bg-slate-500',
    'active:shadow-none'
  ],
  red: [
    'bg-red-600',
    'text-white',
    'shadow-red-600',
    'hover:bg-red-400',
    'active:bg-red-300',
    'active:shadow-none'
  ],
  green: [
    'bg-green-600',
    'text-white',
    'shadow-green-600',
    'hover:bg-green-400',
    'active:bg-green-300',
    'active:shadow-none'
  ],
  blue: [
    'bg-blue-600',
    'text-white',
    'shadow-blue-600',
    'hover:bg-blue-400',
    'active:bg-blue-300',
    'active:shadow-none'
  ]
}

function getStyles(color) {
  return styles[color]?.join(' ') ?? '';
}