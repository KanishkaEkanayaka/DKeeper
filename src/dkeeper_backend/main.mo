import List "mo:base/List";
import Debug "mo:base/Debug";

actor DKeeper{

  //create a type Note
  public type Note={
    title:Text;
    content:Text;
  };

  //create notes list
  stable var notes :List.List<Note> = List.nil<Note>();

  public func createNote(titleText:Text,contentText:Text){

    let newNote: Note = {
      title=titleText;
      content=contentText;
    };

    notes:= List.push(newNote,notes);
    Debug.print(debug_show(notes));

  };

  //method to return array of Note
  public query func readNotes(): async [Note]{
    return List.toArray(notes);
  };

  public func removeNote(id:Nat){
    let listFront = List.take(notes,id); //take items from the list up to number in the id
    let listBack = List.drop(notes,id+1); //drop items after the list items from the number in the id
    notes := List.append(listFront,listBack); //append two lists and assign to notes
  };

}