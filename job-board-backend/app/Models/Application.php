<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Application extends Model
{
    //
    use HasFactory;

    protected $fillable = [
        'user_id', 'job_id', 'message',
    ];

    public function applicant()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function job()
    {
        return $this->belongsTo(Job::class);
    }
}
