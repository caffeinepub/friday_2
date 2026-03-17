import Array "mo:core/Array";
import List "mo:core/List";
import Map "mo:core/Map";
import Order "mo:core/Order";
import Text "mo:core/Text";
import Time "mo:core/Time";
import Nat "mo:core/Nat";
import Iter "mo:core/Iter";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  // === Types ===
  module Message {
    public type Message = {
      id : Nat;
      content : Text;
      timestamp : Time.Time;
      sender : Text;
    };

    public func compare(message1 : Message, message2 : Message) : Order.Order {
      Nat.compare(message1.id, message2.id);
    };
  };

  type Conversation = {
    messages : List.List<Message.Message>;
  };

  type UserPreferences = {
    language : Text;
    voiceSettings : Text;
    name : Text;
  };

  public type UserProfile = {
    name : Text;
    principalId : Text;
  };

  // === Mixins and State ===
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // Stable storage for user conversations, preferences, and profiles
  let userConversations = Map.empty<Principal, Conversation>();
  let userPreferences = Map.empty<Principal, UserPreferences>();
  let userProfiles = Map.empty<Principal, UserProfile>();

  // === User Profile Functions (required by frontend) ===

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can get their profile");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // === Backend Logic ===

  // Save a single message to user's conversation
  public shared ({ caller }) func saveMessage(message : Message.Message) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save messages");
    };

    let conversation = switch (userConversations.get(caller)) {
      case (?existing) { existing };
      case (null) {
        {
          messages = List.empty<Message.Message>();
        };
      };
    };

    conversation.messages.add(message);
    userConversations.add(caller, conversation);
  };

  // Retrieve paginated conversation history (last 50 messages)
  public query ({ caller }) func getConversationHistory(page : Nat, pageSize : Nat) : async [Message.Message] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can fetch conversation history");
    };

    let messages = switch (userConversations.get(caller)) {
      case (?conversation) { conversation.messages };
      case (null) { List.empty<Message.Message>() };
    };

    // Convert messages to array for sorting and pagination
    let messagesArray = messages.toArray().sort();

    let totalCount = messagesArray.size();
    let start = page * pageSize;
    let end = if (start + pageSize >= totalCount) { totalCount } else { start + pageSize };

    if (totalCount == 0 or start >= totalCount) {
      return [];
    };

    let resultArray = Array.tabulate(
      end - start,
      func(i) {
        messagesArray[i + start];
      },
    );
    resultArray;
  };

  // Save user preferences
  public shared ({ caller }) func savePreferences(preferences : UserPreferences) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save preferences");
    };
    userPreferences.add(caller, preferences);
  };

  // Get user preferences
  public query ({ caller }) func getPreferences() : async ?UserPreferences {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can fetch preferences");
    };
    userPreferences.get(caller);
  };

  // Clear conversation history
  public shared ({ caller }) func clearHistory() : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can clear conversation history");
    };
    userConversations.remove(caller);
  };
};
