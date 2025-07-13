
"use client"

import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useToast } from "@/hooks/use-toast"

const profileFormSchema = z.object({
    firstName: z.string().min(2, "El nombre debe tener al menos 2 caracteres."),
    lastName: z.string().min(2, "El apellido debe tener al menos 2 caracteres."),
    email: z.string().email("Por favor, introduce una dirección de correo válida."),
    phone: z.string().optional(),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

export default function AccountProfilePage() {
    const { toast } = useToast()

    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(profileFormSchema),
        defaultValues: {
            firstName: "John",
            lastName: "Doe",
            email: "john.doe@example.com",
            phone: "+1 234 567 890",
        },
    })

    function onSubmit(data: ProfileFormValues) {
        console.log(data)
        toast({
            title: "Perfil Actualizado",
            description: "Tu información personal ha sido guardada.",
        })
    }

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Ajustes de Perfil</h2>
            <p className="text-muted-foreground mb-6">Administra tu información personal.</p>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="firstName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nombre</FormLabel>
                                    <FormControl>
                                        <Input placeholder="John" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="lastName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Apellido</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Doe" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Correo Electrónico</FormLabel>
                                <FormControl>
                                    <Input type="email" placeholder="tu@ejemplo.com" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Número de Teléfono</FormLabel>
                                <FormControl>
                                    <Input type="tel" placeholder="+1 234 567 890" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="mt-6 flex justify-end">
                        <Button type="submit">Guardar Cambios</Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}
