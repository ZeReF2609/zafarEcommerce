import Link from 'next/link';
import { Facebook, Twitter, Instagram } from 'lucide-react';
import { Logo } from '@/components/icons';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

export function Footer() {
  return (
    <footer className="bg-[#121212] text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
          <div className='lg:col-span-2'>
            <Logo className="text-white" />
            <p className="mt-4 max-w-sm text-sm text-white/60">
              Tu tienda única para todo lo genial. Productos de alta calidad y precios inmejorables.
            </p>
            <div className="mt-4 flex space-x-4">
              <Link href="#" className="text-white/60 hover:text-primary transition-colors">
                <Facebook size={20} />
              </Link>
              <Link href="#" className="text-white/60 hover:text-primary transition-colors">
                <Twitter size={20} />
              </Link>
              <Link href="#" className="text-white/60 hover:text-primary transition-colors">
                <Instagram size={20} />
              </Link>
            </div>
          </div>
          <div>
            <h3 className="font-semibold uppercase tracking-wider text-white/80">Tienda</h3>
            <ul className="mt-4 space-y-2">
              <li><Link href="/collections/new-arrivals" className="text-sm text-white/60 hover:text-primary transition-colors">Novedades</Link></li>
              <li><Link href="/collections/summer-collection" className="text-sm text-white/60 hover:text-primary transition-colors">Colección de Verano</Link></li>
              <li><Link href="/products" className="text-sm text-white/60 hover:text-primary transition-colors">Todos los Productos</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold uppercase tracking-wider text-white/80">Nosotros</h3>
            <ul className="mt-4 space-y-2">
              <li><Link href="#" className="text-sm text-white/60 hover:text-primary transition-colors">Nuestra Historia</Link></li>
              <li><Link href="#" className="text-sm text-white/60 hover:text-primary transition-colors">Carreras</Link></li>
              <li><Link href="#" className="text-sm text-white/60 hover:text-primary transition-colors">Prensa</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold uppercase tracking-wider text-white/80">Soporte</h3>
            <ul className="mt-4 space-y-2">
              <li><Link href="#" className="text-sm text-white/60 hover:text-primary transition-colors">Preguntas Frecuentes</Link></li>
              <li><Link href="#" className="text-sm text-white/60 hover:text-primary transition-colors">Contáctanos</Link></li>
              <li><Link href="/account/orders" className="text-sm text-white/60 hover:text-primary transition-colors">Estado del Pedido</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between">
           <p className="text-sm text-white/60 text-center md:text-left">
              &copy; {new Date().getFullYear()} Pionier. Todos los Derechos Reservados.
            </p>
            <div className="mt-4 md:mt-0">
                <form className='flex w-full max-w-sm items-center space-x-2'>
                    <Input type='email' placeholder='Ingresa tu correo' className='bg-white/10 border-white/20 text-white placeholder:text-white/60'/>
                    <Button type='submit'>Suscríbete</Button>
                </form>
            </div>
        </div>
      </div>
    </footer>
  );
}
