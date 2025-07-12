import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function SecurityPage() {
    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Security Settings</h2>
            <p className="text-muted-foreground mb-6">Manage your password.</p>
            <form>
                <div className="space-y-4 max-w-lg">
                    <div className="space-y-2">
                        <Label htmlFor="currentPassword">Current Password</Label>
                        <Input id="currentPassword" type="password" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="newPassword">New Password</Label>
                        <Input id="newPassword" type="password" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirm New Password</Label>
                        <Input id="confirmPassword" type="password" />
                    </div>
                </div>
                <div className="mt-6 flex justify-end">
                     <Button>Update Password</Button>
                </div>
            </form>
        </div>
    );
}
