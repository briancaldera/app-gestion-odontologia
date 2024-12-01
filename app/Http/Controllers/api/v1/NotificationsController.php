<?php

namespace App\Http\Controllers\api\v1;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;

class NotificationsController extends Controller
{
    public function getNotifications(Request $request)
    {
        $notifications =  $request->user()->notifications ?? [];
        return response($notifications, 200);
    }

    public function markAsRead(Request $request, string $id)
    {
        /* @var User $user*/
        $user = $request->user();
        /* @var Collection $notifications*/
        $notifications = $user->notifications;

        $notification = $notifications->firstOrFail('id', '=', $id);
        if (is_null($notification->read_at)) {
            $notification->markAsRead();
            return response(null, 200);
        } else {
            return response('Notification was already read', 200);
        }
    }
}
