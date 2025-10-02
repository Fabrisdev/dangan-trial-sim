extends Node3D

func _process(delta: float) -> void:
	$Camera3D.look_at($MakotosBigWackyHead.global_position)

func _ready() -> void:
	$AnimationPlayer.play_backwards("new_animation")
	

func close():
	get_tree().quit()
