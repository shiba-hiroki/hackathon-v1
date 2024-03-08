import 'package:mobile_app/models/attendance.dart';

class AttendanceList {
  AttendanceList({
    required this.userID,
    required this.attendances,
  });

  final int userID;
  final List<Attendance> attendances;

  List<Attendance> getAttendances() {
    return attendances;
  }

  int getUserID() {
    return userID;
  }

  factory AttendanceList.fromJson(Map<String, dynamic> json) {
    return AttendanceList(
      userID: json['userID'],
      attendances: (json["attendances"] as List<dynamic>)
          .map((attendance) => Attendance.fromJson(attendance))
          .toList(),
    );
  }
}
