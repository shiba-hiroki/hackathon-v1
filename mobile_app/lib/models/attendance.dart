class Attendance {
  Attendance({
    required this.time,
    required this.state,
  });

  final String time;
  final String state;

  factory Attendance.fromJson(dynamic json) {
    return Attendance(
      time: json["time"] as String,
      state: json["state"] as String,
    );
  }
}

class ShowAttendance {
  ShowAttendance({
    required this.day,
    required this.checkIn,
    required this.checkOut,
    required this.breakStart,
    required this.breakEnd,
  });

  final int day;
  String checkIn;
  String checkOut;
  String breakStart;
  String breakEnd;
}
